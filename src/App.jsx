import { useState } from 'react';
import './App.css';

function App() {
  const [todoValueTemp, setTodoValueTemp] = useState('');
  const [todoValues, setTodoValues] = useState([]);

  const inputValue = (e) => {
    setTodoValueTemp(e.target.value);
  };
  const onRegistrationButton = () => {
    setTodoValues([...todoValues, { id: Date.now(), text: todoValueTemp }]);
    console.log(todoValues);
    setTodoValueTemp('');
  };

  const deletegg = (id) => {
    setTodoValues((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className='wrap'>
        <div className='todo'>
          <div className='todo__inputFunctions'>
            <input
              type='text'
              className='todo__input'
              onChange={inputValue}
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
                {todoValues.map((item, i) => {
                  console.log(item);
                  return (
                    <tr className='todo__tr' key={i}>
                      <td>No.{i + 1}</td>
                      <td>{item.text}</td>
                      <td>
                        <button type='button'>수정</button>
                      </td>
                      <td>
                        <button type='button' onClick={() => deletegg(item.id)}>
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
    </>
  );
}

export default App;
