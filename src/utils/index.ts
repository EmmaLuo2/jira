import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// 页面存在很多渲染时就需要加载的东西
//  注意，不管是自定义hook还是react的hook，都要以use开头
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 自定义一个useDebounce
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  // 每次value变化的时候都需要更新debounceValue的值（使用useEffect）
  useEffect(() => {
    console.log("1");
    //  每次依赖项变化时都需要设定一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    // ps 我觉得应该是在当前渲染之前和上次渲染完成之后再运行, 前提是一定要有当前渲染
    return () => {
      console.log("2");
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};

//
export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
