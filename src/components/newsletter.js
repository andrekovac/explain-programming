import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import theme from '../style/theme';
import { rhythm } from '../style/typography';

const WHITE = theme.colors.white;
const PRIMARY = theme.colors.brand[500];

const Newsletter = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const [cookies, setCookie] = useCookies([
    'explain_programming_email',
    'explain_programming_firstName',
  ]);

  const descriptionTitle = () => (
    <>
      {`Newsletter about what André is up to`}{' '}
      <span role="img" aria-label="Cool Face Icon">
        🐒
      </span>
    </>
  );
  const descriptionText = () => (
    <>
      {`I'll occasionally write you when I added a few new things for you to take
      a look at`}{' '}
      <span role="img" aria-label="Yeah Icon">
        🐋🐏🎉
      </span>
    </>
  );

  const onSubmit = (data) => {
    const formId = process.env.GATSBY_CONVERT_KIT_FORM_ID;
    const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;

    const requestBody = {
      api_key: process.env.GATSBY_CONVERT_KIT_API_KEY,
      email: data.email,
      first_name: data.firstName,
      tags: [process.env.GATSBY_CONVERT_KIT_TAG],
    };

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        charset: 'utf-8',
      },
    };

    // send POST request
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          // set local state
          setIsSuccess(true);
          setIsError(false);
          setIsDone(true);

          // set cookies
          setCookie('explain_programming_email', data.email, { path: '/' });
          setCookie('explain_programming_firstName', data.firstName, {
            path: '/',
          });
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error while sending data to ConvertKit', error);
        }
        setIsDone(true);
        setIsError(true);
        setIsSuccess(false);
      });
  };

  const getEmailError = () => {
    let error;
    if (errors.email && errors.email.message) {
      error = errors.email.message;
    }
    if (errors.email && errors.email.type === 'required') {
      error = 'required field';
    }
    return error;
  };

  const getFirstNameError = () =>
    errors.firstName && errors.firstName.type === 'required'
      ? 'required field'
      : null;

  return (
    <Wrapper>
      <Title>{descriptionTitle()}</Title>
      <Description>{descriptionText()}</Description>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LabelWrapper>
          <Label htmlFor="firstName">Name</Label>
          <ErrorText>{getFirstNameError()}</ErrorText>
        </LabelWrapper>
        <Input
          id="firstName"
          type="text"
          placeholder="The name to great you"
          name="firstName"
          ref={register({ required: true, maxLength: 60 })}
          error={!!errors.firstName}
        />
        <span>{errors.firstName && errors.firstName.message}</span>
        <LabelWrapper>
          <Label htmlFor="email">Email</Label>
          <ErrorText>{getEmailError()}</ErrorText>
        </LabelWrapper>
        <Input
          id="email"
          type="text"
          placeholder="your@email.com"
          name="email"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Please enter a valid email address',
            },
          })}
          error={!!errors.email}
        />

        <SubmitWrapper row={isDone && (isSuccess || isError)}>
          {isDone ? (
            isSuccess ? (
              <>
                <SuccessText>{`Perfect!\nCheck your mail and confirm your email address!`}</SuccessText>
                <Box>
                  <Text>Didn't receive anything?</Text>
                  <ButtonRepeat
                    onClick={() => {
                      setIsSuccess(false);
                      setIsError(false);
                      setIsDone(false);
                    }}
                  >
                    Try again
                  </ButtonRepeat>
                </Box>
              </>
            ) : (
              <>
                <ErrorTextSubmit>{`Something went wrong!\nPlease try again or check your internet connection!`}</ErrorTextSubmit>
                <Box>
                  <ButtonRepeat
                    onClick={() => {
                      setIsSuccess(false);
                      setIsError(false);
                      setIsDone(false);
                    }}
                  >
                    Try again
                  </ButtonRepeat>
                </Box>
              </>
            )
          ) : (
            <Button type="submit">Sign up</Button>
          )}
        </SubmitWrapper>
      </Form>
    </Wrapper>
  );
};

export default Newsletter;

const Wrapper = styled.div`
  background: ${theme.colors.brand[700]};
  background-size: 250% 350%;

  padding: ${rhythm(1)};
  border-radius: 5px;
  max-width: 320px;
  margin-bottom: ${rhythm(2)};

  /* Move box out of footer */
  margin-top: -50px;
`;

const Title = styled.div`
  color: ${WHITE};
  margin-top: 0;
  line-height: 1.5;
  font-size: ${theme.fontSizes.lg};
`;

const Text = styled.span`
  color: ${WHITE};
  width: 40%;
`;

const Description = styled.p`
  color: ${WHITE};
  font-size: ${theme.fontSizes.sm};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubmitWrapper = styled(FlexWrapper)`
  margin-top: 20px;
  min-height: 60px;

  flex-direction: ${(props) => (props.row ? 'column' : 'inherit')};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LabelWrapper = styled(FlexWrapper)`
  margin-bottom: 3px;
`;

const Label = styled.label`
  color: ${WHITE};
  display: block;
`;

const ErrorText = styled.span`
  color: ${WHITE};
  font-size: 0.8rem;
`;

const SuccessText = styled.div`
  color: #ffcc34;
  font-weight: bold;
  margin-bottom: ${rhythm(1)};
`;

const ErrorTextSubmit = styled.div`
  color: ${theme.colors.red[200]};
  font-weight: bold;
  margin-bottom: ${rhythm(1)};
`;

const Form = styled.form`
  margin: 5px 0;
`;

const Input = styled.input`
  margin-bottom: 20px;
  border-color: ${PRIMARY};
  border-style: solid;
  border-width: ${(props) => (props.error ? '1px 1px 1px 10px' : 0)};
  border-image: none 100% / 1 / 0 stretch;
  background: rgb(251, 236, 242) none repeat scroll 0% 0%;

  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const Button = styled.button`
  border: 2px solid ${WHITE};
  color: ${WHITE};
  background-color: ${PRIMARY};

  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 300ms ease 0s;

  &:hover,
  &:active {
    color: ${PRIMARY};
    background-color: ${WHITE};
  }
`;

const ButtonRepeat = styled(Button)`
  font-size: 0.9rem;
  padding: 2px 5px;
`;
