import React, { useState, useRef, useEffect } from 'react'
import { FaClipboardList } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

import TodoItem from './TodoItem';

import TodoFooter from './TodoFooter';


const Todo = () => {

  // Todos listesini localStorage'dan yükle, yoksa boş dizi ile başlat
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // Input elemanına referans için useRef kullanıyoruz
  const data = useRef();

  // Yeni görev ekleme fonksiyonu
  const addTodos = () => {
    // Input değerini al ve baştaki/sondaki boşlukları temizle
    const inputText = data.current.value.trim();

    // Eğer boşsa, ekleme yapma
    if (inputText === "") return;

    // Yeni görev nesnesi oluştur
    const newTodo = {
      id: todos.length + 1,   // id olarak mevcut uzunluğa +1 veriyoruz
      text: inputText,        // görev metni
      isComplete: false,      // başlangıçta tamamlanmamış
    };

    // Yeni görevi todos dizisine ekle
    setTodos((prev) => [...prev, newTodo]);

    // Input alanını temizle
    data.current.value = "";
  };

  // Görev tamamlama durumunu değiştiren fonksiyon (toggle)
  const toggle = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          // Eğer id eşleşiyorsa isComplete değerini tersine çevir
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo; // diğer görevleri değiştirme
      });
    });
  };

  // Görev silme fonksiyonu
  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      // Verilen id'ye sahip görevi filtreleyerek çıkar
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  // Todos dizisi her değiştiğinde localStorage güncelle
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* Footer işlemleri */

  // Aktif (tamamlanmamış) görevlerin sayısını hesapla
  const activeTodosCount = todos.filter(todo => !todo.isComplete).length;

  // Tüm görevleri temizleme fonksiyonu
  const clearAllTodos = () => {
    setTodos([]);
  };

  // Görev listesi için filtre durumu: "all", "active", "completed"
  const [filter, setFilter] = useState("all");

  // Filtreye göre görevleri süz (filtre uygula)
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.isComplete;    // aktif görevler
    if (filter === "completed") return todo.isComplete;  // tamamlanan görevler
    return true;  // "all" seçiliyse tüm görevler
  });




  return (
    <div className="place-self-center w-[400px] h-[600px] bg-white p-12 flex flex-col gap-8 rounded-lg">
      {/* Başlık Kısmı */}
      <h1 className="text-3xl font-semibold 
        tracking-wider flex gap-2 items-center"><FaClipboardList /> Todo App </h1>

      {/* Arama Kısmı */}
      <div className="flex items-center bg-[#EEEEEE] rounded-full">
        <input

          className="border-none outline-none p-3.5 flex-1 bg-transparent placeholder:text-slate-400"
          placeholder="Yeni Bir Görev Gir.."
          type="text"
          ref={data}
        />
        <div className="bg-[#00ADB5] h-full w-14 flex items-center justify-center rounded-r-full cursor-pointer
        " onClick={() => addTodos()}>
          <IoIosAddCircleOutline className=" size-10 text-[#EEEEEE]" />
        </div>

      </div>

      {/* Listeleme Bölümü */}
      <div className=" mt-2 flex-1 overflow-y-auto">
        {filteredTodos.map(todo => (
          <TodoItem
            deleteTodo={deleteTodo}
            key={todo.id}
            todo={todo}
            toggle={toggle}
          />
        ))}
       
      </div>
      <div>
         <TodoFooter
          activeCount={activeTodosCount}
          clearAll={clearAllTodos}
          filter={filter}
          setFilter={setFilter}
        />
      </div>


    </div>
  )
}

export default Todo
