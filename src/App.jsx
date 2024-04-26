import { useState } from 'react';
import './App.css';

function App() {
  const [todoValueTemp, setTodoValueTemp] = useState('');
  const [todoValues, setTodoValues] = useState([]);
  const [todoModify, setTodoModify] = useState(false);

  const inputValue = (event) => {
    setTodoValueTemp(event.target.value);
  };
  const onRegistrationButton = () => {
    setTodoValues([
      ...todoValues,
      { id: Date.now(), text: todoValueTemp, isEdit: false },
    ]);
    setTodoValueTemp('');
  };

  const onDeleteButton = (id) => {
    setTodoValues((todos) => {
      return todos.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  const onModify = (id) => {
    const newTodos = todoValues.map((todo) => {
      if (todo.id === id) {
        todo.isEdit = true;
        return todo;
      }
      return todo;
    });
    setTodoValues(newTodos);
  };

  const onInputModify = (event, id) => {
    // 배열의 텍스 값을 변경한다
    const newTodos = todoValues.map((todo) => {
      if (todo.id === id) {
        todo.text = event.target.value;
        return todo;
      }
      return todo;
    });
    setTodoValues(newTodos);
  };

  return (
    <>
      {console.log('html 시작')}
      <div className='wrap'>
        <div className='todo'>
          <div className='todo__inputFunctions'>
            <input
              type='text'
              className='todo__input'
              onChange={inputValue}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onRegistrationButton();
                }
              }}
              value={todoValueTemp}
            />
            <button
              type='button'
              className='todo__btn'
              onClick={onRegistrationButton}
            >
              등록
            </button>
          </div>
          <div className='todo__lists'>
            <table className='todo__table'>
              <colgroup>
                <col width={100} />
                <col width={'auto'} />
                <col width={100} />
                <col width={100} />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>할 일</th>
                  <th>수정</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {/* 
1. 수정을 하고 싶은 글의 수정버튼을 누르면 해단 input에 포커싱이 된다. 
  1-1. onModify 함수에서 해당 input에 focus() 를 준다. (과제 useRef를 사용하여 해결)
2. 인풋에 글을 입력하면 입력한 값을 state에다 저장한다.
  2-1. todoValues 안에 text 에 input에 입력한 값을 넣어준다. 
  * 과제: 사용자가 수정한 값을 임시 property에 저장하여 "저장" 버튼을
  * 누르면 저장 "취소" 버튼을 누르면 원래 값으로 롤백
3. 버튼을 클릭하면 입력한 값의 state를 
                */}
                {todoValues.map((item, i) => {
                  return (
                    <tr className='todo__tr' key={i}>
                      <td>No.{i + 1}</td>
                      <td>
                        {!item.isEdit && <span>{item.text}</span>}
                        {item.isEdit && (
                          <input
                            type='text'
                            value={item.text}
                            onChange={(event) => onInputModify(event, item.id)}
                          />
                        )}
                      </td>
                      <td>
                        <button type='button' onClick={() => onModify(item.id)}>
                          수정
                        </button>
                      </td>
                      <td>
                        <button
                          type='button'
                          onClick={() => onDeleteButton(item.id)}
                        >
                          {item.id}
                          삭제
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {console.log('html 끝')}
    </>
  );
}

export default App;
