import React from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

interface Props {
  id: string;
  value: any;
  onChange: (event: any) => void;
  options: string[];
  label: string;
  name: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MultiSelect: React.StatelessComponent<Props> = ({
  id,
  value,
  onChange,
  options,
  label,
  name
}) => (
  <FormControl fullWidth>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Select
      multiple
      value={value}
      name={name}
      onChange={onChange}
      input={<Input id={id} />}
      renderValue={(selected: any) => (
        <ChipWrapper>
          {selected.map((value: any) => (
            <Chip key={value} label={value} />
          ))}
        </ChipWrapper>
      )}
      MenuProps={MenuProps}
    >
      {options.map((lang: string) => (
        <MenuItem key={lang} value={lang}>
          {lang}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
