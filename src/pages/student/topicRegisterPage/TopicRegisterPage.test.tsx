import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { RootState } from '../../../store';

import { AcademyRank } from '../../../shared/types/academyRank';
import { DegreeType } from '../../../shared/types/degreeType';
import { GenderType } from '../../../shared/types/gender';
import { VariableTypeEnum } from '../../../shared/types/variableType';
import { OperationTypeEnum } from '../../../shared/types/operationType';
import { displayPeriod } from '../../../shared/functions';
import { PeriodStatus } from '../../../shared/types/periodStatus';

import { HCMUTInstructorService } from '../../../externalService/HCMUTService/instructorService';
import { HCMUTStudentService } from '../../../externalService/HCMUTService/studentService';

import ChoosePeriod from "./ChoosePeriod";
import PeriodRowTable from './PeriodRowTable';
import RegisterStep1 from './RegisterStep1';

import ManualInstructorInput from './RegisterStep2/instructorInfo/manualInput';
import SearchInstructorOnSystem, { Props } from './RegisterStep2/instructorInfo/searchOnSystem';
import ManualLeaderInput from './RegisterStep2/leaderInfo/manualInput';
import SearchLeaderOnSystem from './RegisterStep2/leaderInfo/searchOnSystem';
import ManualOtherMembersInput from './RegisterStep2/otherMemberInput/manualnput';
import SearchOtherMemberOnHCMUTSystem from './RegisterStep2/otherMemberInput/searchOnHCMUTSystem';
import { 
    getExprResult,
    checkInequality,
    calcLeaderNumericLogicalExpr,
    calcOtherMembersNumericLogicalExpr,
    calcAllMemberStringLogicalExpr,
    calcOtherMemberStringLogicalExpr,
    getNumNecessarySatisfiedMember,
    calcQuantityCompareExpr,
 } from './RegisterStep2/getExprResult';


describe("test instructor info", () => {
    describe("ManualInstructorInput component", () => {
        const setTopicMock = jest.fn();
        const topic = {
            name: "",
            type: "",
            period: "",
            studentId: "",
            numInstructor: 1,
            numMember: 0,
            instructors: [
                {
                    name: 'John Smith',
                    staffId: '123',
                    gender: GenderType.MALE,
                    phoneNumber: '555-5555',
                    email: 'john.smith@example.com',
                    academyRank: AcademyRank.GS,
                    degree: DegreeType.TS,
                },
            ],
            instructorsId: ['123'],
            otherMembers: []
        };
        const props = { index: 0, topic, setTopic: setTopicMock };

        test('should update instructor name when input value changes', () => {
            const { getByTestId } = render(<ManualInstructorInput {...props} />);
            const nameInput = getByTestId('name-input');
            fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
            expect(setTopicMock).toHaveBeenCalledWith({
            ...topic,
            instructors: [{ ...topic.instructors[0], name: 'Jane Doe' }],
            });
        });

        test('should update instructor staff ID when input value changes', () => {
            const { getByTestId } = render(<ManualInstructorInput {...props} />);
            const staffIdInput = getByTestId('staffid-input');
            fireEvent.change(staffIdInput, { target: { value: '456' } });
            expect(setTopicMock).toHaveBeenCalledWith({
            ...topic,
            instructors: [{ ...topic.instructors[0], staffId: '456' }],
            instructorsId: ['456'],
            });
        });

        test('should update instructor gender when select value changes', () => {
            const { getByTestId } = render(<ManualInstructorInput {...props} />);
            const genderSelect = getByTestId('gender-select');
            fireEvent.change(genderSelect, { target: { value: GenderType.FEMALE } });
            expect(setTopicMock).toHaveBeenCalledWith({
            ...topic,
            instructors: [{ ...topic.instructors[0], gender: GenderType.FEMALE }],
            });
        });
    });
    
    describe('SearchInstructorOnSystem component', () => {
        let props: Props;

        beforeEach(() => {
            props = {
                index: 0,
                setTopic: jest.fn(),
                topic: {
                    name: "",
                    type: "",
                    period: "",
                    studentId: "",
                    numInstructor: 1,
                    numMember: 0,
                    instructors: [
                        {
                            name: 'John Smith',
                            staffId: '123',
                            gender: GenderType.MALE,
                            phoneNumber: '555-5555',
                            email: 'john.smith@example.com',
                            academyRank: AcademyRank.GS,
                            degree: DegreeType.TS,
                        },
                    ],
                    instructorsId: ['123'],
                    otherMembers: []
                }
            };
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        test('should render the component', () => {
            const { getByTestId } = render(<SearchInstructorOnSystem {...props} />);
            expect(getByTestId('search-instructor')).toBeInTheDocument();
        });

        test('should display instructor info on input change', async () => {

            jest.spyOn(HCMUTInstructorService, 'getHCMUTInstructorById').mockResolvedValue({ name: 'John Doe', staffId: '123' });

            const { getByTestId } = render(<SearchInstructorOnSystem {...props} />);
            const input = getByTestId('instructor-input') as HTMLInputElement;
            const button = getByTestId('find-button') as HTMLButtonElement;
            fireEvent.change(input, { target: { value: '123' } });
            fireEvent.click(button);
            expect(HCMUTInstructorService.getHCMUTInstructorById).toHaveBeenCalledTimes(1);
            expect(HCMUTInstructorService.getHCMUTInstructorById).toHaveBeenCalledWith('123');
            expect(input.value).toBe('123');
        });

        test('should display error message on input change with non-existent staffId', async () => {

            jest.spyOn(HCMUTInstructorService, 'getHCMUTInstructorById').mockResolvedValue({ name: 'John Doe', staffId: '123' });

            const { getByTestId } = render(<SearchInstructorOnSystem {...props} />);
            const input = getByTestId('instructor-input') as HTMLInputElement;
            const button = getByTestId('find-button') as HTMLButtonElement;
            fireEvent.change(input, { target: { value: '456' } });
            fireEvent.click(button);
            expect(HCMUTInstructorService.getHCMUTInstructorById).toHaveBeenCalledTimes(1);
            expect(HCMUTInstructorService.getHCMUTInstructorById).toHaveBeenCalledWith('456');
            expect(input.value).toBe('456');
            expect(props.setTopic).not.toHaveBeenCalled();
        });
    });
});

describe("test leader info", () => {
    describe('ManualLeaderInput component', () => {
        const mockConditionField = {
          field1: { variable: 'Điểm môn học', subjectId: "var1", subjectName: "math" },
          field2: { variable: 'var2' },
          field3: { variable: 'var3' },
        };
        const mockDataForCondition = {
          otherMembers: [{ key: 'value' }],
          leader: { var1: 'value1', var2: 'value2', var3: 'value3' },
        };
      
        const mockSetDataForCondition = jest.fn();
      
        const mockStore = createStore(() => ({ auth: { user: { name: 'John Doe', gender: 'male', email: 'johndoe@example.com', phoneNumber: '123456789', studentId: '12345', educationType: 'bachelor' } } }));
      
        test('should display user information and condition variables', () => {
          const { getByText, getByDisplayValue } = render(
            <Provider store={mockStore}>
              <ManualLeaderInput
                conditionField={mockConditionField}
                dataForCondition={mockDataForCondition}
                setDataForCondition={mockSetDataForCondition}
              />
            </Provider>
          );
      
          expect(getByText('Họ và tên: John Doe')).toBeInTheDocument();
          expect(getByText('Giới tính: male')).toBeInTheDocument();
          expect(getByText('Email: johndoe@example.com')).toBeInTheDocument();
          expect(getByText('Số điện thoại: 123456789')).toBeInTheDocument();
          expect(getByText('Mã số sinh viên: 12345')).toBeInTheDocument();
          expect(getByText('Chương trình đào tạo: Bachelor')).toBeInTheDocument();
      
          expect(getByDisplayValue('value1')).toBeInTheDocument();
          expect(getByDisplayValue('value2')).toBeInTheDocument();
          expect(getByDisplayValue('value3')).toBeInTheDocument();
        });
      
        test('should update dataForCondition when input value changes', () => {
          const { getByDisplayValue } = render(
            <Provider store={mockStore}>
              <ManualLeaderInput
                conditionField={mockConditionField}
                dataForCondition={mockDataForCondition}
                setDataForCondition={mockSetDataForCondition}
              />
            </Provider>
          );
          const inputElement = getByDisplayValue('value1') as HTMLInputElement;
          expect(inputElement).toBeInTheDocument();
          fireEvent.change(inputElement, { target: { value: 'new value' } });
      
          expect(mockSetDataForCondition).toHaveBeenCalledWith(expect.objectContaining({
            leader: expect.objectContaining({
              var1: 'new value',
            }),
          }));
        });
    });

    describe('SearchLeaderOnSystem', () => {
        
        test('displays the leader info from hcmut system', async () => {
            const mockStore = configureMockStore([thunk]);
            const initialState: RootState = {
                auth: {
                    isLoggedIn: true,
                    user: {
                        _id: '123',
                        role: 'sinh viên',
                    },
                },
                message: {message: ""},
                topicCondition: {
                    leaderCondition: "",
                    expression: "",
                    instructorCondition: "",
                }
            };
            const store = mockStore(initialState);

            const mockDataForCondition = {
            otherMembers: [{ name: 'Alice' }, { name: 'Bob' }],
            leader: { name: 'Charlie' },
            };
            jest.spyOn(HCMUTStudentService, 'getHCMUTStudentById').mockResolvedValue({
                _id:"1",
                name: 'John Doe',
                gender: 'Nam',
                phoneNumber: '123456',
                email: 'johndoe@example.com',
                subjects:[],
                birthDate: "",
                studentId: "1914845",
                educationType: "Chính quy",
                accumulatedCredits: 123,
                averageMark: 8.0,
            });
            const {getByText} = render(
                <Provider store={store}>
                <SearchLeaderOnSystem
                    conditionField={{
                    variable1: { variable: VariableTypeEnum.ACCUMULATE_CREDIT },
                    variable2: {
                        variable: VariableTypeEnum.SUBJECT_MARK,
                        subjectName: 'Math',
                        subjectId: '123',
                    },
                    }}
                    dataForCondition={mockDataForCondition}
                    setDataForCondition={jest.fn()}
                />
                </Provider>
            );
        
            await waitFor(() => {
                const name = getByText(/John Doe/i);
                const studentId = getByText(/1914845/i);
                const gender = getByText(/Nam/i);
                const phoneNumber = getByText(/123456/i);
                const email = getByText(/johndoe@example.com/i);
        
                expect(name).toBeInTheDocument();
                expect(studentId).toBeInTheDocument();
                expect(gender).toBeInTheDocument();
                expect(phoneNumber).toBeInTheDocument();
                expect(email).toBeInTheDocument();
            });
        });
    });
});

describe("test other member input", () => {
    describe('ManualOtherMembersInput component', () => {
        const props = {
          index: 0,
          setTopic: jest.fn(),
          topic: {
            name: "",
            type: "",
            period: "",
            studentId: "",
            numInstructor: 1,
            numMember: 0,
            instructors: [
                {
                    name: 'John Smith',
                    staffId: '123',
                    gender: GenderType.MALE,
                    phoneNumber: '555-5555',
                    email: 'john.smith@example.com',
                    academyRank: AcademyRank.GS,
                    degree: DegreeType.TS,
                },
            ],
            instructorsId: ['123'],
            otherMembers: [{ 
                name: '', 
                gender: '', 
                email: '', 
                phoneNumber: '', 
                studentId: '',
                birthDate: '',
                educationType: '' }],
          },
          conditionField: {
            field1: { variable: 'Điểm môn học', subjectId: "var1", subjectName: "math" },
            field2: { variable: 'var2' },
            field3: { variable: 'var3' },
          },
          dataForCondition: {
            otherMembers: [{ var1: 'value1', var2: 'value2', var3: 'value3' }],
            leader: { var1: 'value1', var2: 'value2', var3: 'value3' },
          },
          setDataForCondition: jest.fn(),
        };
      
        test('should render the component', () => {
          const { getByText, getByDisplayValue } = render(<ManualOtherMembersInput {...props} />);
          expect(getByText('Họ và tên:')).toBeInTheDocument();
          expect(getByText('Giới tính:')).toBeInTheDocument();
          expect(getByText('Email:')).toBeInTheDocument();
          expect(getByText('Số điện thoại:')).toBeInTheDocument();
          expect(getByText('Mã số sinh viên:')).toBeInTheDocument();
          expect(getByText('Chương trình đào tạo:')).toBeInTheDocument();
      
          expect(getByDisplayValue('value1')).toBeInTheDocument();
          expect(getByDisplayValue('value2')).toBeInTheDocument();
          expect(getByDisplayValue('value3')).toBeInTheDocument();
        });
      
        test('should update the name field when the input value changes', () => {
          const { getByTestId} = render(<ManualOtherMembersInput {...props} />);
          const nameInput = getByTestId('name-input') as HTMLInputElement;
          fireEvent.change(nameInput, { target: { value: 'Huyền' } });
          const genderSelect = getByTestId('gender-select') as HTMLSelectElement;
          fireEvent.change(genderSelect, { target: { value: 'Nữ' } });
          expect(props.setTopic).toHaveBeenCalledWith({
            name: "",
            type: "",
            period: "",
            studentId: "",
            numInstructor: 1,
            numMember: 0,
            instructors: [
                {
                    name: 'John Smith',
                    staffId: '123',
                    gender: GenderType.MALE,
                    phoneNumber: '555-5555',
                    email: 'john.smith@example.com',
                    academyRank: AcademyRank.GS,
                    degree: DegreeType.TS,
                },
            ],
            instructorsId: ['123'],
            otherMembers: [{ 
                name: 'Huyền', 
                gender: 'Nữ', 
                email: '', 
                phoneNumber: '', 
                studentId: '',
                birthDate: '',
                educationType: '' }],
          });
        });
    });

    describe('SearchOtherMemberOnHCMUTSystem', () => {
        const index = 0;
        const setTopic = jest.fn();
        const topic = {
            name: "",
            type: "",
            period: "",
            studentId: "",
            numInstructor: 1,
            numMember: 1,
            instructors: [],
            otherMembers: [
                { 
                    studentId: "1111111",
                    fmName: "asd",
                    name: "asd",
                    gender: "Nam",
                    email: "asdf@gmail.com",
                    phoneNumber: "0123456789",
                    educationType: "Chính quy",
                    birthDate: ""
                }
            ],
            instructorsId: [],
        };
        const conditionField = {
            variable1: { variable: VariableTypeEnum.ACCUMULATE_CREDIT },
            variable2: {
                variable: VariableTypeEnum.SUBJECT_MARK,
                subjectName: 'Math',
                subjectId: '123',
            },
        };
        const dataForCondition = {
            otherMembers: [{ name: 'Alice' }, { name: 'Bob' }],
            leader: { name: 'Charlie' },
        };
        const setDataForCondition = jest.fn();
      
        const props = {
          index,
          setTopic,
          topic,
          conditionField,
          dataForCondition,
          setDataForCondition,
        };
      
        beforeEach(() => {
          jest.resetAllMocks();
        });
      
        test('should render the component', () => {
          const {getByTestId} = render(<SearchOtherMemberOnHCMUTSystem {...props} />);
          const emailInput = getByTestId('email-input');
          const studentIdInput = getByTestId('studentid-input');
          expect(emailInput).toBeInTheDocument();
          expect(studentIdInput).toBeInTheDocument();
        });
      
        test('should display a spinner when loading student info', async () => {
            jest.spyOn(HCMUTStudentService, 'getHCMUTStudentById').mockResolvedValue({
                _id:"1",
                name: 'John Doe',
                gender: 'Nam',
                phoneNumber: '123456',
                email: 'johndoe@example.com',
                subjects:[],
                birthDate: "",
                studentId: "1914845",
                educationType: "Chính quy",
                accumulatedCredits: 123,
                averageMark: 8.0,
            });
          const {getByTestId} = render(<SearchOtherMemberOnHCMUTSystem {...props} />);
          const emailInput = getByTestId('email-input');
          const searchButton = getByTestId('search-button');
          fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
          fireEvent.click(searchButton);
          const spinner = await getByTestId('loading');
          expect(spinner).toBeInTheDocument();
        });
    });
});

describe("test get expression result of register step2", () => {
    const dataForCondition = {
        otherMembers: [{ foo: 'foo', bar: 'foo' }, { foo: 'bar',bar: 'baz' }],
        leader: { foo: 'qux', baz: 'qux' },
    };
    const numMember = 2;
    
    test('returns true when given an empty expression', () => {
        const expression = {};
        const exprId = '';
        const result = getExprResult(dataForCondition, expression, exprId, numMember);
        expect(result).toEqual(true);
    });
    
    test('returns true when given an expression with an undefined sub-expression', () => {
        const expression = { '': undefined };
        const exprId = '';
        const result = getExprResult(dataForCondition, expression, exprId, numMember);
        expect(result).toEqual(true);
    });
    
    test('checkInequality returns true for valid inputs', () => {
        expect(checkInequality(10, 5, OperationTypeEnum.GREATER)).toBe(true);
        expect(checkInequality(20, 20, OperationTypeEnum.EQUAL)).toBe(true);
        expect(checkInequality(5, 10, OperationTypeEnum.LESS)).toBe(true);
    });
      
    test('checkInequality returns false for invalid inputs', () => {
        expect(checkInequality(NaN, 10, OperationTypeEnum.GREATER)).toBe(false);
        expect(checkInequality(5, 30, OperationTypeEnum.EQUAL)).toBe(false);
    });

    test("should return true when leftValue is equal to rightValue", () => {
        const logicExpr = {
          operator: OperationTypeEnum.EQUAL,
          object: {
            name: "some object",
          },
          leftExpr: [
            {
              variable: "subject1",
              weight: 2,
              subjectName: "Subject 1",
              subjectId: "subject-1",
              key: "subject1",
            },
            {
              variable: "subject2",
              weight: 3,
              subjectName: "Subject 2",
              subjectId: "subject-2",
              key: "subject2",
            },
          ],
          rightValue: "10",
        };
        const dataForCondition = {
          otherMembers: [],
          leader: {
            subject1: "5",
            subject2: "0",
          },
        };
        const result = calcLeaderNumericLogicalExpr(
          logicExpr,
          dataForCondition,
          10
        );
        expect(result).toBe(true);
    });
    
    test("should return false when leftValue is less than rightValue", () => {
        const logicExpr = {
          operator: OperationTypeEnum.GREATER,
          object: {
            name: "some object",
          },
          leftExpr: [
            {
              variable: "subject1",
              weight: 2,
              subjectName: "Subject 1",
              subjectId: "subject-1",
              key: "subject1",
            },
            {
              variable: "subject2",
              weight: 3,
              subjectName: "Subject 2",
              subjectId: "subject-2",
              key: "subject2",
            },
          ],
          rightValue: "10",
        };
        const dataForCondition = {
          otherMembers: [],
          leader: {
            subject1: "2",
            subject2: "2",
          },
        };
        const result = calcLeaderNumericLogicalExpr(
          logicExpr,
          dataForCondition,
          10
        );
        expect(result).toBe(false);
    });

    test('returns true when all members satisfy the condition', () => {
        const logicExpr = {
          operator: OperationTypeEnum.GE,
          object: { name: 'Age' },
          leftExpr: [
            { variable: 'age', key: 'age' }
          ],
          rightValue: '18'
        };
        const dataForCondition = {
          leader: { age: '25' },
          otherMembers: [
            { age: '19' },
            { age: '22' },
            { age: '20' },
          ]
        };
        const numMember = 4;
        const result = calcOtherMembersNumericLogicalExpr(logicExpr, dataForCondition, 18, numMember);
        expect(result).toBe(true);
    });
    
    test('returns false when some members fail to satisfy the condition', () => {
        const logicExpr = {
          operator: OperationTypeEnum.GE,
          object: { name: 'Age' },
          leftExpr: [
            { variable: 'age', key: 'age' }
          ],
          rightValue: '18'
        };
        const dataForCondition = {
          leader: { age: '25' },
          otherMembers: [
            { age: '17' },
            { age: '22' },
            { age: '20' },
          ]
        };
        const numMember = 4;
        const result = calcOtherMembersNumericLogicalExpr(logicExpr, dataForCondition, 18, numMember);
        expect(result).toBe(false);
    });

    test('should return true if all members satisfy the equality condition', () => {
        const logicExpr = {
          operator: OperationTypeEnum.EQUAL,
          object: { name: 'name' },
          leftExpr: [{ variable: 'variable', key: 'key' }],
          rightValue: 'value',
        };
        const dataForCondition = {
          leader: { variable: 'value' },
          otherMembers: [
            { variable: 'value' },
            { variable: 'value' },
            { variable: 'value' },
          ],
        };
        const numMember = 4;
        const result = calcAllMemberStringLogicalExpr(logicExpr, dataForCondition, 'value', numMember);
        expect(result).toBe(true);
    });
    
    test('should return false if one of the members does not satisfy the equality condition', () => {
        const logicExpr = {
          operator: OperationTypeEnum.EQUAL,
          object: { name: 'name' },
          leftExpr: [{ variable: 'variable', key: 'key' }],
          rightValue: 'value',
        };
        const dataForCondition = {
          leader: { variable: 'value' },
          otherMembers: [
            { variable: 'value' },
            { variable: 'otherValue' },
            { variable: 'value' },
          ],
        };
        const numMember = 4;
        const result = calcAllMemberStringLogicalExpr(logicExpr, dataForCondition, 'value', numMember);
        expect(result).toBe(false);
    });
    
    test('returns true when all other members have equal value', () => {
        const logicExpr = {
          operator: OperationTypeEnum.EQUAL,
          object: { name: 'age' },
          leftExpr: [{ variable: 'age', key: '123' }],
          rightValue: '30',
        };
        const dataForCondition = {
          otherMembers: [
            { age: '30', name: 'John', id: '1' },
            { age: '30', name: 'Jane', id: '2' },
          ],
          leader: { age: '30', name: 'Jake', id: '0' },
        };
        const result = calcOtherMemberStringLogicalExpr(logicExpr, dataForCondition, '30', 3);
        expect(result).toBe(true);
    });

    test('returns false when not all other members have equal value', () => {
        const logicExpr = {
          operator: OperationTypeEnum.EQUAL,
          object: { name: 'age' },
          leftExpr: [{ variable: 'age', key: '123' }],
          rightValue: '30',
        };
        const dataForCondition = {
          otherMembers: [
            { age: '30', name: 'John', id: '1' },
            { age: '25', name: 'Jane', id: '2' },
          ],
          leader: { age: '30', name: 'Jake', id: '0' },
        };
        const result = calcOtherMemberStringLogicalExpr(logicExpr, dataForCondition, '30', 3);
        expect(result).toBe(false);
    });

    test('returns correct number of necessary members from percentage', () => {
        const result = getNumNecessarySatisfiedMember('50%', 10);
        expect(result).toBe(5);
    });
    
    test('returns true when left value equals right value', () => {
        const result = calcQuantityCompareExpr(5, 5, OperationTypeEnum.EQUAL);
        expect(result).toBe(true);
    });
});

describe('ChoosePeriod component', () => {
  const mockStore = configureMockStore([thunk]);
  const initialState: RootState = {
                auth: {
                    isLoggedIn: true,
                    user: {
                        _id: '123',
                        role: 'sinh viên',
                    },
                },
                message: {message: ""},
                topicCondition: {
                    leaderCondition: "",
                    expression: "",
                    instructorCondition: "",
                }
  };
  const store = mockStore(initialState);
  test('should render correctly', () => {
    render(
      <Provider store={store}>
        <ChoosePeriod choosePeriod={() => {}} setTopic={() => {}} topic={{}} />
      </Provider>
    );

    expect(screen.getByText('Năm:')).toBeInTheDocument();
    expect(screen.getByText('Trạng thái:')).toBeInTheDocument();
    expect(screen.getByText('Toàn bộ')).toBeInTheDocument();
    expect(screen.getByText('Không có đợt đăng ký')).toBeInTheDocument();
  });

  test('should update the periods list when changing the status', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <ChoosePeriod choosePeriod={() => {}} setTopic={() => {}} topic={{}} />
      </Provider>
    );

    const statusSelect = screen.getByTestId('status-select');
    fireEvent.change(statusSelect, { target: { value: 'đóng' } });

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});

describe("PeriodRowTable component", () => {
  const period = {
    period: "2022-Q1",
    status: PeriodStatus.OPEN,
    title: "Period 1",
    _id: "123"
  };

  const props = {
    index: 1,
    period,
    choosePeriod: jest.fn(),
    setTopic: jest.fn(),
    topic: {}
  };

  test("renders the period data correctly", () => {
    const { getByText } = render(<PeriodRowTable {...props} />);

    expect(getByText(`#${props.index}`)).toBeInTheDocument();
    expect(getByText(displayPeriod(props.period.period))).toBeInTheDocument();
    expect(getByText(props.period.status)).toBeInTheDocument();
    expect(getByText(props.period.title)).toBeInTheDocument();
  });

  test("calls choosePeriod and setTopic when the button is clicked", () => {
    const { getByTestId } = render(<PeriodRowTable {...props} />);

    fireEvent.click(getByTestId("choose-button"));

    expect(props.choosePeriod).toHaveBeenCalledWith(period);
    expect(props.setTopic).toHaveBeenCalledWith({
      ...props.topic,
      period: period._id
    });
  });

  test("disables the button when the period status is not open", () => {
    const closedPeriod = { ...period, status: PeriodStatus.CLOSE };
    const propsWithClosedPeriod = { ...props, period: closedPeriod };

    const { getByText } = render(<PeriodRowTable {...propsWithClosedPeriod} />);

    expect(getByText("Đăng ký")).toBeInTheDocument();
  });
});

describe('RegisterStep1', () => {
  const defaultProps = {
    onSetNextStep: jest.fn(),
    period: {
      period: '2022-01-31T17:00:00.000+00:00'
    },
    backToChoosePeriod: jest.fn(),
    topic: {
      name: "",
      type: "",
      period: "",
      studentId: "",
      numMember: 1,
      otherMembers: [],
      numInstructor: 1,
      instructorsId: [],
      instructors: []
    },
    setTopic: jest.fn()
  };

  test('should display the current period', () => {
    render(<RegisterStep1 {...defaultProps} />);
    expect(screen.getByText('02/2022')).toBeInTheDocument();
  });

  test('should update topic state when selecting number of members', () => {
    render(<RegisterStep1 {...defaultProps} />);
    const numMemberSelect = screen.getByTestId('num-of-member-select');
    userEvent.selectOptions(numMemberSelect, '2');
    expect(defaultProps.setTopic).toHaveBeenCalledWith(expect.objectContaining({ numMember: 2 }));
  });

  test('should update topic state when selecting number of instructors', () => {
    render(<RegisterStep1 {...defaultProps} />);
    const numInstructorSelect = screen.getByTestId('num-of-instructor-select');
    userEvent.selectOptions(numInstructorSelect, '2');
    expect(defaultProps.setTopic).toHaveBeenCalledWith(expect.objectContaining({ numInstructor: 2 }));
  });

  test('should call onSetNextStep when the "Tiếp theo" button is clicked', () => {
    render(<RegisterStep1 {...defaultProps} />);
    const nextButton = screen.getByText(/tiếp theo/i);
    userEvent.click(nextButton);
    expect(defaultProps.onSetNextStep).toHaveBeenCalledWith(false);
  });

  test('should call backToChoosePeriod when the back icon is clicked', () => {
    render(<RegisterStep1 {...defaultProps} />);
    const backButton = screen.getByTestId('back-button');
    userEvent.click(backButton);
    expect(defaultProps.backToChoosePeriod).toHaveBeenCalled();
  });
});