// PostFilterForm.js
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TextInput,useListContext } from "react-admin";

export const PostFilterForm = ({ additionalFilters }) => {
  const { displayedFilters, filterValues, setFilters, hideFilter } =
    useListContext();

  const form = useForm({
    defaultValues: filterValues,
  });

  if (!displayedFilters.main) return null;

  const onSubmit = (values) => {
    if (Object.keys(values).length > 0) {
      setFilters(values);
    } else {
      hideFilter("main");
    }
  };

  const resetFilter = () => {
    setFilters({}, []);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="flex-end" mb={1}>
          <Box component="span" mr={2}>
            <TextInput
              resettable
              helperText={false}
              source="q"
              label="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {additionalFilters.map((filter) => (
            <Box key={filter.source} component="span" mr={2}>
              <TextInput
                resettable
                helperText={false}
                source={filter.source}
                label={filter.label}
              />
            </Box>
          ))}
          <Box component="span" mr={2} mb={1.5}>
            <Button variant="outlined" color="primary" type="submit">
              Filter
            </Button>
          </Box>
          <Box component="span" mb={1.5}>
            <Button variant="outlined" onClick={resetFilter}>
              Close
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};
