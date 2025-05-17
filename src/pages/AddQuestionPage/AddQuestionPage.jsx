import { useActionState } from 'react';
import { Button } from '../../components/Button';
import cls from './AddQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';


const createCardAction = async (_prevState, formData) => {
   try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;


    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }

    const question = response.json();
    toast.success("New question is successfully created!");

    return isClearForm ? {} : question;
   } catch (error) {
    toast.error(error.message);
    return {};
   }
};

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, 
  { clearForm: true});

  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <form action={formAction} className={cls.form}>
          <div className={cls.formControl}>
          <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={formState.question}
              name="question"
              id="QuestionField"
              cols="30"
              rows="2"
              required
              placeholder="please enter a question"
            ></textarea>
          </div>
          <div className={cls.formControl}>
          <label htmlFor="answerField">Short Answer: </label>
            <textarea
              defaultValue={formState.answer}
              name="answer"
              id="answerField"
              cols="30"
              rows="2"
              required
              placeholder="please enter a short answer"
            ></textarea>
          </div>
          <div className={cls.formControl}>
          <label htmlFor="descriptionField">Description: </label>
            <textarea
              defaultValue={formState.description}
              name="description"
              id="descriptionField"
              cols="30"
              rows="5"
              required
              placeholder="please enter a full description"
            ></textarea>
          </div>
          <div className={cls.formControl}>
          <label htmlFor="resourcesField">Resources: </label>
            <textarea
              defaultValue={formState.resources}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              required
              placeholder="please enter resources separated by commas"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="levelField">Level: </label>
              <select name="Level" id="levelField" defaultValue={formState.level}>
                <option disabled>Question level</option>
                <hr />
                <option value="1">1 - easiest</option>
                <option value="2">2 - medium</option>
                <option value="3">3 - hardest</option>
              </select>
          </div>

          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input className={cls.checkbox} type="checkbox" name="cleareForm" id="clearFormField" defaultChecked={formState.clearForm} />
            <span>Clear form after submiting?</span>
          </label>

          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  );
};
