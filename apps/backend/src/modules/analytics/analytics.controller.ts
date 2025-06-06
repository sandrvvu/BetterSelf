import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";

import { AnalyticsService } from "./analytics.service";
import { UserAnalytics } from "./libs/dto/user-analytics";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("overview")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [UserAnalytics] })
  @ApiResponse({
    description: "Successfully retrieved analytics overview.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  async getOverview(
    @CurrentUserId() userId: string,
    @Query("months") months?: number,
  ): Promise<UserAnalytics> {
    return await this.analyticsService.getUserAnalytics(userId, months);
  }
}
