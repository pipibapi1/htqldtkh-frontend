import { render, fireEvent, getByTestId } from '@testing-library/react';
import { DataTypeEnum } from '../../../../shared/types/dataType';
import { FormField } from './TemplateFormUpdate';

describe("test Template form update", () => {
  test('FormField updates field name when user types in input', () => {
    const form = {
      templateId: 'template-id',
      fields: [
        {
          initialName: 'Field 1',
          name: 'Field 1',
          dataType: DataTypeEnum.Text,
          note: ''
        },
        {
          initialName: 'Field 2',
          name: 'Field 2',
          dataType: DataTypeEnum.Number,
          note: ''
        }
      ],
      markedTemplateFileName: ''
    };
    const setForm = jest.fn();
  
    const { getByTestId } = render(
      <FormField indx={0} form={form} setForm={setForm} />
    );
  
    const nameInput = getByTestId('name-input') as HTMLInputElement;
  
    fireEvent.change(nameInput, { target: { value: 'New field name' } });
  
    expect(nameInput.value).toBe('New field name');
    expect(setForm).toHaveBeenCalledWith({
      templateId: 'template-id',
      fields: [
        {
          initialName: 'Field 1',
          name: 'New field name',
          dataType: DataTypeEnum.Text,
          note: ''
        },
        {
          initialName: 'Field 2',
          name: 'Field 2',
          dataType: DataTypeEnum.Number,
          note: ''
        }
      ],
      markedTemplateFileName: ''
    });
  });
})

