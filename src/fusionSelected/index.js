// import React, { useEffect } from "react";
// import { Table } from "@alifd/next";
// import { dataSource, columns } from "./mock";

// import "./index.scss";

// let originDir = {};

// export default () => {
//   const onMouseDown = (event) => {
//     const contextMenu = document.getElementById("contextMenu");
//     contextMenu.style.display = "none";
//     if (event.button !== 0) return;

//     // funsion 使用，antd 不需要，点击表头不会触发该事件
//     const isHeaderNode =
//       event.target?.parentNode
//         ?.getAttribute("class")
//         ?.indexOf("next-table-header-node") > -1;
//     if (isHeaderNode) return;

//     const rect = event.target.getBoundingClientRect();
//     originDir = {
//       top: rect.top,
//       left: rect.left,
//       right: rect.right,
//       bottom: rect.bottom,
//     };
//     renderNodes(originDir);
//   };

//   const onMouseMove = (event) => {
//     if (!originDir.top) return;
//     const rect = event.target.getBoundingClientRect();

//     let coordinates = {};

//     // 1、圈选元素在中心位置左上方
//     if (
//       rect.top <= originDir.top &&
//       rect.left <= originDir.left &&
//       rect.right <= originDir.left &&
//       rect.bottom <= originDir.top
//     ) {
//       coordinates = {
//         top: rect.top,
//         left: rect.left,
//         right: originDir.right,
//         bottom: originDir.bottom,
//       };
//     }

//     // 圈选元素在中心位置右上方
//     if (
//       rect.top <= originDir.top &&
//       rect.left >= originDir.left &&
//       rect.right >= originDir.right &&
//       rect.bottom <= originDir.bottom
//     ) {
//       coordinates = {
//         top: rect.top,
//         left: originDir.left,
//         right: rect.right,
//         bottom: originDir.bottom,
//       };
//     }

//     // 圈选元素在中心位置左下方
//     if (
//       rect.top >= originDir.top &&
//       rect.left <= originDir.left &&
//       rect.right <= originDir.right &&
//       rect.bottom >= originDir.bottom
//     ) {
//       coordinates = {
//         top: originDir.top,
//         left: rect.left,
//         right: originDir.right,
//         bottom: rect.bottom,
//       };
//     }

//     // 圈选元素在中心位置右下方
//     if (
//       rect.top >= originDir.top &&
//       rect.left >= originDir.left &&
//       rect.right >= originDir.right &&
//       rect.bottom >= originDir.bottom
//     ) {
//       coordinates = {
//         top: originDir.top,
//         left: originDir.left,
//         right: rect.right,
//         bottom: rect.bottom,
//       };
//     }

//     renderNodes(coordinates);
//   };

//   const renderNodes = (coordinates) => {
//     const nodes = document.querySelectorAll(".next-table-cell-wrapper");
//     nodes.forEach((item) => {
//       const target = item?.getBoundingClientRect();
//       clearStyle(item);
//       if (
//         target?.top >= coordinates.top &&
//         target?.right <= coordinates.right &&
//         target?.left >= coordinates.left &&
//         target?.bottom <= coordinates.bottom
//       ) {
//         item.setAttribute("data-brush", "true");

//         if (target.top === coordinates.top) {
//           item.setAttribute("brush-border-top", "true");
//         }
//         if (target.right === coordinates.right) {
//           item.setAttribute("brush-border-right", "true");
//         }
//         if (target.left === coordinates.left) {
//           item.setAttribute("brush-border-left", "true");
//         }
//         if (target.bottom === coordinates.bottom) {
//           item.setAttribute("brush-border-bottom", "true");
//         }
//       }
//     });
//   };

//   const clearStyle = (item) => {
//     item.hasAttribute("data-brush") && item.removeAttribute("data-brush");
//     item.hasAttribute("brush-border-top") &&
//       item.removeAttribute("brush-border-top");
//     item.hasAttribute("brush-border-right") &&
//       item.removeAttribute("brush-border-right");
//     item.hasAttribute("brush-border-left") &&
//       item.removeAttribute("brush-border-left");
//     item.hasAttribute("brush-border-bottom") &&
//       item.removeAttribute("brush-border-bottom");
//   };

//   const onMouseUp = () => {
//     originDir = {};
//   };

//   const onContextMenu = (event) => {
//     event.preventDefault(); // 阻止默认右键菜单弹出

//     const contextMenu = document.getElementById("contextMenu");

//     // 定位上下文菜单的位置
//     contextMenu.style.left = `${event.clientX}px`;
//     contextMenu.style.top = `${event.clientY}px`;

//     // 显示上下文菜单
//     contextMenu.style.display = "block";
//   };

//   const onClickCopy = () => {
//     const contextMenu = document.getElementById("contextMenu");
//     const copyableElements = document.querySelectorAll("[data-brush=true]");

//     // 遍历保存文本
//     let copiedContent = "";
//     copyableElements.forEach((element, index) => {
//       let separator = " ";
//       if (index < copyableElements.length - 1) {
//         const next = copyableElements?.[index + 1];
//         if (
//           next?.getBoundingClientRect().top !==
//           element.getBoundingClientRect().top
//         ) {
//           separator = "\n";
//         }
//       }
//       copiedContent += `${element.innerHTML}${separator}`;
//     });

//     // 执行复制操作
//     navigator.clipboard
//       .writeText(copiedContent)
//       .then(() => {
//         console.log("已复制内容：", copiedContent);
//       })
//       .catch((error) => {
//         console.error("复制失败:", error);
//       });

//     // 隐藏上下文菜单
//     contextMenu.style.display = "none";
//   };

//   useEffect(() => {
//     const clickSave = (event) => {
//       if ((event.ctrlKey || event.metaKey) && event.key === "c") {
//         onClickCopy();
//         event.preventDefault(); // 阻止默认的保存操作
//       }
//     };

//     document.addEventListener("keydown", clickSave);

//     return () => {
//       document.removeEventListener("keydown", clickSave);
//     };
//   }, []);

//   return (
//     <div className="brush-table">
//       <Table
//         style={{ userSelect: "none" }}
//         columns={columns}
//         dataSource={dataSource}
//         onMouseDown={onMouseDown}
//         onMouseMove={onMouseMove}
//         onMouseUp={onMouseUp}
//         onContextMenu={onContextMenu}
//       />
//       <div
//         id="contextMenu"
//         className="context-menu"
//         style={{ cursor: "pointer" }}
//       >
//         <div onClick={onClickCopy}>复制</div>
//       </div>
//     </div>
//   );
// };

function test() {
  let a = 1;
  if (true) {
    let a = 2;
  }

  console.log(a);
}

test();
