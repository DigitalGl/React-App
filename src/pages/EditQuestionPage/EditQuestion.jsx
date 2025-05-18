import { useActionState } from 'react';
import { Loader } from '../../components/Loader';
import { QuestionForm } from '../../components/QuestionForm';
import cls from './EditQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn';
import { dateFormat } from '../../helpers/dateFormat';
import { API_URL } from '../../constants';
import { toast } from 'react-toastify';

const editCardAction = async (_prevState, formData) => {
   try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const questionId = newQuestion.questionId;
    const isClearForm = newQuestion.clearForm;


    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }

    const question = response.json();
    toast.success("The question is edited successfully!");

    return isClearForm ? {} : question;
   } catch (error) {
    toast.error(error.message);
    return {};
   }
};

export const EditQuestion = ({initialState = {}}) => {
    const [formState, formAction, isPending] = useActionState(editCardAction, 
    { ...initialState, clearForm: false});

    return (
        <>
        {isPending && <Loader />}

            <h1 className={cls.formTitle}>Edit question</h1>

            <div className={cls.formContainer}>
            <QuestionForm formAction={formAction} state={formState} isPending={isPending} 
            submitBtnText="Edit Question" />
            </div>
        </>
    );
};
