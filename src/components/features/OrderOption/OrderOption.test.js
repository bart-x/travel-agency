import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='test' type='test' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render correct title', () => {
    const expectedName = 'name';
    const component = shallow(<OrderOption type='dropdown' name={expectedName} />);
    expect(component.find('.title').text()).toEqual(expectedName);
    //console.log(component.debug);
  });

  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };

  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
      { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };

  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: { currentValue: [mockProps.currentValue] },
    number: { currentValue: 1 },
    text: {},
    date: {},
  };

  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for (let type in optionTypes) {
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */

      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption; /* 1 */

      beforeEach(() => {
        mockSetOrderOption = jest.fn(); /* 2 */
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption} /* 3 */
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
      });

      /* common tests */

      /* sample dummy test
      it('passes dummy test', () => {
        expect(1).toBe(1);
        console.log(component.debug());
        console.log(subcomponent.debug());
      }); */

      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy;
        expect(subcomponent.length).toBe(1);
      });

      /* type specific-tests */
      // tests for dropdown
      switch (type) {
        case 'dropdown': {
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'icons': {
          it('contains div with class icon', () => {
            const div = renderedSubcomponent.find('.icon');
            expect(div.length).toBe(2);
            expect(div.at(0).type()).toBe('div');
            expect(div.at(1).type()).toBe('div');
          });
          // Interakcje dla icons - Na ostatnim divie z klasą icon zasymuluj kliknięcie. Drugi argument w simulate nie będzie potrzebny.
          it('should run setOrderOption function on click', () => {
            renderedSubcomponent.find('.icon .icon').at(0).simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'checkboxes': {
          it('contains div with class checkboxes and input with type checkbox', () => {
            const divCheckboxes = renderedSubcomponent.find('.checkboxes');
            expect(divCheckboxes.length).toBe(1);

            const checkboxInput = divCheckboxes.find('input[type="checkbox"]');
            expect(checkboxInput.length).toBe(mockProps.values.length);

            expect(checkboxInput.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(checkboxInput.at(1).prop('value')).toBe(mockProps.values[1].id);
          });
          // Interakcje dla checkboxes - musisz znaleźć element, który ma atrybut value o wartości takiej samej, jak wartość stałej testValue.

          // Interakcje dla checkboxes - Na tym elemencie należy zasymulować event change, ale w drugim argumencie zamiast value podać checked: true.

          // Interakcje dla checkboxes - Dzięki temu handler eventu będzie myślał, że ten checkbox został zaznaczony.
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', { currentTarget: { checked: true } });
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
          });
          break;
        }
        case 'number': {
          it('contains div with class number and input with class inputSmall', () => {
            const divNumber = renderedSubcomponent.find('.number');
            expect(divNumber.length).toBe(1);

            const inputSmallNumber = divNumber.find('input[type="number"]');
            expect(inputSmallNumber.length).toBe(1);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValueNumber } });
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
          });
          break;
        }
        case 'text': {
          it('contains div with input type text', () => {
            const divText = renderedSubcomponent.find('div');
            expect(divText.length).toBe(1);

            const inputText = divText.find('input[type="text"]');
            expect(inputText.length).toBe(1);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('input[type="text"]').simulate('change', { currentTarget: { value: testValue } });
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'date': {
          // Interakcje dla date - W tym wypadku nie mamy inputa czy selecta, ale komponent DatePicker. To właśnie jego musimy znaleźć (po jego nazwie).

          //Nie musimy jednak go renderować – wystarczy że zasymulujemy na nim event change, a jako drugi argument podamy testValue zamiast obiektu, który do tej pory wstawialiśmy jako drugi argument.
          it('contains DataPicker', () => {
            const datePicker = renderedSubcomponent.find(DatePicker);
            expect(datePicker.length).toBe(1);
          });
          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find(DatePicker).simulate('change', testValue);

            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
      }
    });
  }
});
