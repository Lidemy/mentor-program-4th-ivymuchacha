/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import {
  GlobalStyle, Wrapper, Form, Title, Description, QuestionTitle,
  Required, Input, MustFilled, Footer, Button, Selection,
} from './style';

function Question({
  text, name, inputType, placeholder, onChange, onBlur, show,
}) {
  return (
    <div>
      <QuestionTitle>
        {text}
        <Required />
      </QuestionTitle>
      <div>
        <Input
          name={name}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      { show ? (
        <MustFilled>
          {text}
未填寫完成
        </MustFilled>
      ) : ''}
    </div>
  );
}

function Selector({
  text, onChange, onBlur, show,
}) {
  return (
    <div>
      <QuestionTitle>
        {text}
        <Required />
      </QuestionTitle>
      <Selection>
        <div>
          <label htmlFor="imagination">
            <input type="radio" name="type" id="imagination" value="imagination" onChange={onChange} onBlur={onBlur} />
            躺在床上用想像力實作
          </label>
        </div>
        <div>
          <label htmlFor="search">
            <input type="radio" name="type" id="search" value="search" onChange={onChange} onBlur={onBlur} />
            趴在地上滑手機找現成的
          </label>
        </div>
      </Selection>
      {show ? (
        <MustFilled>
          {text}
未勾選
        </MustFilled>
      ) : ''}
    </div>
  );
}

function Other({ text, name, placeholder }) {
  return (
    <div>
      <QuestionTitle>{text}</QuestionTitle>
      <p>對活動的一些建議</p>
      <div>
        <Input name={name} type="text" placeholder={placeholder} />
      </div>
    </div>
  );
}

function App() {
  const [res, setRes] = useState({
    nickname: '',
    email: '',
    phone: '',
    type: '',
    referal: '',
    other: '',
  });
  const [show, setShow] = useState({});


  // 提交
  const handleSubmit = (e) => {
    if (!res.type) {
      e.preventDefault();
      setShow({
        ...show,
        type: true,
      });
    } else {
      setShow({
        ...show,
        type: false,
      });
    }
    if (!res.nickname || !res.email || !res.phone) {
      alert('必填欄位未填寫完成！');
      e.preventDefault();
    }
  };

  // Input Change
  const handleInputChange = (e) => {
    setRes({
      ...res,
      [e.target.name]: e.target.value,
    });
  };

  // 必填欄位處理
  const handleRequired = (e) => {
    if (!e.target.value || e.target.value === '') {
      setShow({
        ...show,
        [e.target.name]: true,
      });
    } else {
      setShow({
        ...show,
        [e.target.name]: false,
      });
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Title>新拖延運動報名表單</Title>
          <Description>
              活動日期：2020/12/10 ~ 2020/12/11
          </Description>
          <Description>
              活動地點：台北市大安區新生南路二段1號
          </Description>
          <MustFilled>*必填</MustFilled>
          <Question
            text="暱稱"
            name="nickname"
            inputType="text"
            placeholder="您的回答"
            onChange={handleInputChange}
            onBlur={handleRequired}
            show={show.nickname}
          />
          <Question
            text="電子郵件"
            name="email"
            inputType="email"
            placeholder="您的電子郵件"
            onChange={handleInputChange}
            onBlur={handleRequired}
            show={show.email}
          />
          <Question
            text="手機號碼"
            name="phone"
            inputType="text"
            placeholder="您的手機號碼"
            onChange={handleInputChange}
            onBlur={handleRequired}
            show={show.phone}
          />
          <Selector
            text="報名類型"
            onChange={handleInputChange}
            onBlur={handleRequired}
            show={show.type}
          />
          <Question
            text="怎麼知道這個活動的？"
            inputType="text"
            name="referal"
            placeholder="您的回答"
            onChange={handleInputChange}
            onBlur={handleRequired}
            show={show.referal}
          />
          <Other
            text="其他"
            name="other"
            placeholder="您的回答"
            onChange={handleInputChange}
          />
          <Button value="提交" type="submit" />
          <div>請勿透過表單送出您的密碼。</div>
        </Form>
      </Wrapper>
      <Footer>
          © 2020 © Copyright. All rights Reserved.
      </Footer>
    </div>
  );
}

export default App;
