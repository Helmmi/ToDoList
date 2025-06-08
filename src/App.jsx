import { useEffect, useRef, useState } from 'react'
import './App.css'
import Alert from './components/Alert'

function App() {
  const [list, setList] = useState(() => {
    const storedList = localStorage.getItem("todoList");
    return storedList ? JSON.parse(storedList) : [];
  });
  const inputRef = useRef("")
  const [alert,setAlert] = useState(null)
  const showAlert = (text,color) => {
    setAlert({text,color})
    setTimeout(() => setAlert(null), 3000);
  }
  const handleAdd = () => {
    const newItem = { text: inputRef.current.value, finished: false };
    if(newItem.text.length !== 0){
      setList([...list,newItem])
    inputRef.current.value=""
    showAlert(newItem.text, "blue");
    }else{
      showAlert('', "yellow");
    }
  }
  const handleDelete = (indexToDelete) => {
    const deleteItem = list[indexToDelete]
    const updatedList = list.filter((_, index) => index !== indexToDelete);
    setList(updatedList);
    showAlert(deleteItem.text,"red")
  };
  const handleEdit = (indexToEdit) => {
    const oldText = list[indexToEdit]
    inputRef.current.value = oldText.text
    const updatedList = list.filter((_, index) => index !== indexToEdit);
    setList(updatedList);
    showAlert(oldText.text, "green");

  }
  const handleClick= (index) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, finished: !item.finished } : item
    );
    setList(updatedList);
  };
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  

  return (
    <>
      <h1 className="title">To Do List</h1>
      <div>
        {alert && <Alert text={alert.text} color={alert.color} />}
        
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
        />
        <button onClick={handleAdd} className="btnAjoute">
          Ajouter
        </button>
      </div>
      <div>
        <ul className="list">
          {list.map((item, index) => (
            <li key={index} onClick={() => handleClick(index)}>
              <span className={item.finished && "fineshed"}>{item.text}</span>
              <button
                className="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(index);
                }}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
              >
                Delete
              </button>
            </li>
))}
        </ul>
      </div>
    </>
  );
}

export default App
