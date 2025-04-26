import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

import { ChatMessageRole } from "../../../modules/reflections/chat-message.entity";
import { CreateTaskDto } from "../../../modules/tasks/libs/dto/create-task.dto";

import { TaskResponseSchema } from "./shemas/task.shema";

@Injectable()
export class AiAssistantService {
  private readonly logger = new Logger("AiAssistantService");
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>("openai.apiKey"),
    });
  }

  async generateGoalTasks(
    goalId: string,
    goalDetails: string,
  ): Promise<CreateTaskDto[]> {
    try {
      const completion = await this.openai.beta.chat.completions.parse({
        messages: [
          {
            content: `
          Generate a structured, step-by-step task plan for the given goal based on the provided information.
           The tasks should not follow a strict sequential order, but rather represent independent actions that can be performed in any order.
          Ensure that each task is:
          - Clearly defined and actionable.
          - Assigned an 'importance', 'urgency', and 'difficulty' between 1 and 5.  
          - Associated with a 'successProbability' between 0 and 100.  
          - Have an 'estimatedTime' with a valid unit (minutes, hours, days, months, years).    
          - Use ISO 8601 formatting for any dates.  

          The goal is to generate a set of independent tasks, allowing manual prioritization and scheduling later based on the user's preferences.
          `,
            role: "system",
          },
          {
            content: `
          Generate a structured task plan for the following goal.
          Information:
          - Goal ID: ${goalId}.
          - Goal details: ${goalDetails}    
          `,
            role: "user",
          },
        ],
        model: "gpt-4o-2024-08-06",
        response_format: zodResponseFormat(TaskResponseSchema, "tasks"),
      });

      const tasks = completion.choices[0].message.parsed as CreateTaskDto[];
      return tasks;
    } catch (e) {
      this.logger.warn(`Error with request to ChatGPT: ${e}`);
      throw new ServiceUnavailableException("Failed request to ChatGPT");
    }
  }

  async getAssistantResponse(
    messages: { role: ChatMessageRole; content: string }[],
  ): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages,
        model: "gpt-4o-2024-08-06",
      });

      return completion.choices[0].message.content;
    } catch (e) {
      this.logger.error(`Error with OpenAI API: ${e}`);
      throw new ServiceUnavailableException("Failed request to OpenAI");
    }
  }
}
