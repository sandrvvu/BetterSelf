import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from "@/components/ui";
import {
  TopsisSettingsSchema,
  TopsisSettingsSchemaType,
} from "@/lib/validation/topsisi-settings.schema";
import {
  TopsisSettings,
  useUpdateTopsisSettingsMutation,
} from "@/state/features/users/userApi";

export default function TopsisSettingsForm({
  settings,
}: {
  settings: TopsisSettings;
}) {
  const [update, { isLoading: isUpdating }] = useUpdateTopsisSettingsMutation();

  const form = useForm<TopsisSettingsSchemaType>({
    resolver: zodResolver(TopsisSettingsSchema),
    defaultValues: {
      weights: settings.weights,
      isBenefit: settings.isBenefit,
    },
  });
  console.log(form.formState.errors);
  const onSubmit = async (values: TopsisSettingsSchemaType) => {
    await update(values).unwrap();
    toast.success("TOPSIS settings updated");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4 border">
      <h2 className="text-lg font-semibold text-purple-800">TOPSIS Settings</h2>
      <p className="text-sm text-gray-500">Adjust how tasks are prioritized</p>
      <Form {...form}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit(onSubmit)(event);
          }}
          className="space-y-4"
        >
          {settings.criteria.map((criterion, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-start">
              <Input
                value={criterion}
                disabled
                className="bg-gray-100 text-gray-700"
              />

              <FormField
                control={form.control}
                name={`weights.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`isBenefit.${index}`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormLabel className="whitespace-nowrap">
                      Benefit?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          {form.formState.errors.weights?.root?.message && (
            <p className="text-sm text-red-500">
              {form.formState.errors.weights.root.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700"
          >
            {isUpdating ? "Saving..." : "Save TOPSIS Settings"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
