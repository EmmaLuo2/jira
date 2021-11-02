import React from 'react';
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import qs from 'qs';
import {cleanObject,useMount, useDebounce} from '../../utils';

const apiUrl = process.env.REACT_APP_API_URL

// searchPanel组件通过修改param的值来更新list的值，所以searchPanel需要param，而list组件需要list，所以状态提升，将param的修改和list的修改提到当前的组件上

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState(0);
  const [list, setList] = useState([]);
  const debounceValue = useDebounce(param, 2000)
  useEffect(()=>{
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceValue))}`).then( async res=>{
        // 使用list来装请求到的数据
        if(res.ok) {
          setList(await res.json())
        }
    })
  }, [debounceValue])
  useMount(()=>{
    fetch(`${apiUrl}/users`).then( async res=>{
        // 使用list来装请求到的数据
        if(res.ok) {
            setUsers(await res.json())
        }
    })
  })
  return (
    
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
