import React from 'react'
import type { SelectInputOption } from '@app/ui/components/Form/utils/options'

const SelectOptionsList = ({ options }: { options: SelectInputOption[] }) => (
  <>
    {options.map((option) =>
      option.hidden ? null : 'options' in option ? (
        <optgroup
          key={option.name}
          label={option.name}
          disabled={option.disabled}
        >
          <SelectOptionsList options={option.options} />
        </optgroup>
      ) : (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.name}
        </option>
      ),
    )}
    )
  </>
)

export default SelectOptionsList
