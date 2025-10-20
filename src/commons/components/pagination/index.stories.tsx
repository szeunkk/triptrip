// import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// import { useState } from "react";
// import { Pagination } from "./index";

// /**
//  * Pagination 컴포넌트
//  *
//  * 페이지네이션을 위한 재사용 가능한 컴포넌트입니다.
//  *
//  * ## Sizes
//  * - **small**: Navigation 24x24px, Pages 24x24px, 14px 폰트
//  * - **medium**: Navigation 24x24px, Pages 32x32px, 16px 폰트
//  *
//  * ## States
//  * - **default**: 기본 상태
//  * - **hover**: 호버 상태 시각화
//  * - **active**: 활성 페이지 강조 상태
//  *
//  * ## Features
//  * - **showNavigationArrows**: 좌우 화살표 표시 여부
//  * - **maxVisiblePages**: 최대 표시할 페이지 수
//  */
// const meta = {
//   title: "Commons/Components/Pagination",
//   component: Pagination,
//   parameters: {
//     layout: "centered",
//     docs: {
//       description: {
//         component:
//           "페이지네이션을 위한 재사용 가능한 컴포넌트입니다. 다양한 크기와 상태를 지원합니다.",
//       },
//     },
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     currentPage: {
//       control: { type: "number", min: 1 },
//       description: "현재 페이지 번호 (1부터 시작)",
//       table: {
//         type: { summary: "number" },
//       },
//     },
//     totalPages: {
//       control: { type: "number", min: 1 },
//       description: "전체 페이지 수",
//       table: {
//         type: { summary: "number" },
//       },
//     },
//     size: {
//       control: "select",
//       options: ["small", "medium"],
//       description: "페이지네이션 크기",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "medium" },
//       },
//     },
//     state: {
//       control: "select",
//       options: ["default", "hover", "active"],
//       description: "페이지네이션 상태",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "default" },
//       },
//     },
//     showNavigationArrows: {
//       control: "boolean",
//       description: "좌우 화살표 표시 여부",
//       table: {
//         type: { summary: "boolean" },
//         defaultValue: { summary: "true" },
//       },
//     },
//     maxVisiblePages: {
//       control: { type: "number", min: 1 },
//       description: "최대 표시할 페이지 수",
//       table: {
//         type: { summary: "number" },
//         defaultValue: { summary: "5" },
//       },
//     },
//     onPageChange: {
//       action: "page changed",
//       description: "페이지 변경 핸들러",
//       table: {
//         type: { summary: "(page: number) => void" },
//       },
//     },
//   },
// } satisfies Meta<typeof Pagination>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // ===================================
// // Default Story
// // ===================================
// export const Default: Story = {
//   args: {
//     currentPage: 1,
//     totalPages: 10,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
// };

// // ===================================
// // Size Stories
// // ===================================
// export const SizeSmall: Story = {
//   args: {
//     currentPage: 3,
//     totalPages: 10,
//     size: "small",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
// };

// export const SizeMedium: Story = {
//   args: {
//     currentPage: 3,
//     totalPages: 10,
//     size: "medium",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
// };

// // ===================================
// // State Stories
// // ===================================
// export const StateDefault: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 10,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "기본 상태의 페이지네이션입니다.",
//       },
//     },
//   },
// };

// export const StateHover: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 10,
//     size: "medium",
//     state: "hover",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "호버 상태를 시각화한 페이지네이션입니다.",
//       },
//     },
//   },
// };

// export const StateActive: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 10,
//     size: "medium",
//     state: "active",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "활성 페이지가 강조된 상태입니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Navigation Arrow Stories
// // ===================================
// export const WithNavigationArrows: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 10,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "좌우 화살표가 표시된 페이지네이션입니다.",
//       },
//     },
//   },
// };

// export const WithoutNavigationArrows: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 10,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: false,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "좌우 화살표가 없는 페이지네이션입니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Page Count Stories
// // ===================================
// export const SinglePage: Story = {
//   args: {
//     currentPage: 1,
//     totalPages: 1,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "페이지가 1개만 있는 경우입니다.",
//       },
//     },
//   },
// };

// export const FewPages: Story = {
//   args: {
//     currentPage: 2,
//     totalPages: 3,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "페이지가 적은 경우 (3페이지)입니다.",
//       },
//     },
//   },
// };

// export const ManyPages: Story = {
//   args: {
//     currentPage: 15,
//     totalPages: 50,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "페이지가 많은 경우 (50페이지)입니다.",
//       },
//     },
//   },
// };

// export const FirstPage: Story = {
//   args: {
//     currentPage: 1,
//     totalPages: 20,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "첫 페이지를 보여주는 경우입니다. 이전 버튼이 비활성화됩니다.",
//       },
//     },
//   },
// };

// export const LastPage: Story = {
//   args: {
//     currentPage: 20,
//     totalPages: 20,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "마지막 페이지를 보여주는 경우입니다. 다음 버튼이 비활성화됩니다.",
//       },
//     },
//   },
// };

// // ===================================
// // MaxVisiblePages Stories
// // ===================================
// export const MaxVisiblePages3: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 20,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 3,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "최대 3개의 페이지 번호만 표시합니다.",
//       },
//     },
//   },
// };

// export const MaxVisiblePages7: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 20,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 7,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "최대 7개의 페이지 번호를 표시합니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Interactive Story with State Management
// // ===================================
// export const Interactive: Story = {
//   render: (args) => {
//     const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

//     return (
//       <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//         <Pagination
//           {...args}
//           currentPage={currentPage}
//           onPageChange={(page) => {
//             setCurrentPage(page);
//             console.log("Page changed to:", page);
//           }}
//         />
//         <div style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
//           현재 페이지: {currentPage} / {args.totalPages}
//         </div>
//       </div>
//     );
//   },
//   args: {
//     currentPage: 1,
//     totalPages: 10,
//     size: "medium",
//     state: "default",
//     showNavigationArrows: true,
//     maxVisiblePages: 5,
//     onPageChange: (page) => console.log("Page changed to:", page),
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "실제로 페이지를 변경할 수 있는 인터랙티브 예시입니다. 페이지 번호를 클릭하거나 화살표를 클릭하여 페이지를 이동할 수 있습니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Combination Showcase
// // ===================================
// export const AllSizes: Story = {
//   args: {
//     currentPage: 3,
//     totalPages: 10,
//     onPageChange: (page) => console.log("Page:", page),
//   },
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "24px",
//         alignItems: "center",
//       }}
//     >
//       <div>
//         <div
//           style={{
//             marginBottom: "8px",
//             fontSize: "14px",
//             fontWeight: "600",
//             textAlign: "center",
//           }}
//         >
//           Small Size
//         </div>
//         <Pagination
//           currentPage={3}
//           totalPages={10}
//           size="small"
//           onPageChange={(page) => console.log("Page:", page)}
//         />
//       </div>
//       <div>
//         <div
//           style={{
//             marginBottom: "8px",
//             fontSize: "14px",
//             fontWeight: "600",
//             textAlign: "center",
//           }}
//         >
//           Medium Size
//         </div>
//         <Pagination
//           currentPage={3}
//           totalPages={10}
//           size="medium"
//           onPageChange={(page) => console.log("Page:", page)}
//         />
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "모든 size를 한눈에 비교할 수 있습니다.",
//       },
//     },
//   },
// };

// export const AllStates: Story = {
//   args: {
//     currentPage: 5,
//     totalPages: 10,
//     onPageChange: (page) => console.log("Page:", page),
//   },
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "24px",
//         alignItems: "center",
//       }}
//     >
//       <div>
//         <div
//           style={{
//             marginBottom: "8px",
//             fontSize: "14px",
//             fontWeight: "600",
//             textAlign: "center",
//           }}
//         >
//           Default State
//         </div>
//         <Pagination
//           currentPage={5}
//           totalPages={10}
//           size="medium"
//           state="default"
//           onPageChange={(page) => console.log("Page:", page)}
//         />
//       </div>
//       <div>
//         <div
//           style={{
//             marginBottom: "8px",
//             fontSize: "14px",
//             fontWeight: "600",
//             textAlign: "center",
//           }}
//         >
//           Hover State
//         </div>
//         <Pagination
//           currentPage={5}
//           totalPages={10}
//           size="medium"
//           state="hover"
//           onPageChange={(page) => console.log("Page:", page)}
//         />
//       </div>
//       <div>
//         <div
//           style={{
//             marginBottom: "8px",
//             fontSize: "14px",
//             fontWeight: "600",
//             textAlign: "center",
//           }}
//         >
//           Active State
//         </div>
//         <Pagination
//           currentPage={5}
//           totalPages={10}
//           size="medium"
//           state="active"
//           onPageChange={(page) => console.log("Page:", page)}
//         />
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "모든 state를 한눈에 비교할 수 있습니다.",
//       },
//     },
//   },
// };

// export const CompleteShowcase: Story = {
//   args: {
//     currentPage: 1,
//     totalPages: 10,
//     onPageChange: (page) => console.log("Page:", page),
//   },
//   render: () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
//       {/* Small Size Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Small Size
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "16px",
//             alignItems: "center",
//           }}
//         >
//           <Pagination
//             currentPage={1}
//             totalPages={10}
//             size="small"
//             state="default"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={5}
//             totalPages={10}
//             size="small"
//             state="default"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={10}
//             totalPages={10}
//             size="small"
//             state="default"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={5}
//             totalPages={10}
//             size="small"
//             state="default"
//             showNavigationArrows={false}
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//         </div>
//       </div>

//       {/* Medium Size Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Medium Size
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "16px",
//             alignItems: "center",
//           }}
//         >
//           <Pagination
//             currentPage={1}
//             totalPages={10}
//             size="medium"
//             state="default"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={5}
//             totalPages={10}
//             size="medium"
//             state="default"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={10}
//             totalPages={10}
//             size="medium"
//             state="default"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={5}
//             totalPages={10}
//             size="medium"
//             state="default"
//             showNavigationArrows={false}
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//         </div>
//       </div>

//       {/* Different States */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Different States (Medium Size)
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "16px",
//             alignItems: "center",
//           }}
//         >
//           <Pagination
//             currentPage={5}
//             totalPages={10}
//             size="medium"
//             state="default"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={5}
//             totalPages={10}
//             size="medium"
//             state="hover"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//           <Pagination
//             currentPage={5}
//             totalPages={10}
//             size="medium"
//             state="active"
//             onPageChange={(page) => console.log("Page:", page)}
//           />
//         </div>
//       </div>

//       {/* Different Page Counts */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Different Page Counts
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "16px",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ width: "100%" }}>
//             <div
//               style={{
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 color: "#666",
//                 textAlign: "center",
//               }}
//             >
//               Single Page
//             </div>
//             <Pagination
//               currentPage={1}
//               totalPages={1}
//               size="medium"
//               onPageChange={(page) => console.log("Page:", page)}
//             />
//           </div>
//           <div style={{ width: "100%" }}>
//             <div
//               style={{
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 color: "#666",
//                 textAlign: "center",
//               }}
//             >
//               Few Pages (3 pages)
//             </div>
//             <Pagination
//               currentPage={2}
//               totalPages={3}
//               size="medium"
//               onPageChange={(page) => console.log("Page:", page)}
//             />
//           </div>
//           <div style={{ width: "100%" }}>
//             <div
//               style={{
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 color: "#666",
//                 textAlign: "center",
//               }}
//             >
//               Many Pages (50 pages, showing 15)
//             </div>
//             <Pagination
//               currentPage={15}
//               totalPages={50}
//               size="medium"
//               onPageChange={(page) => console.log("Page:", page)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Different MaxVisiblePages */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Different MaxVisiblePages (20 total pages, page 10)
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "16px",
//             alignItems: "center",
//           }}
//         >
//           <div style={{ width: "100%" }}>
//             <div
//               style={{
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 color: "#666",
//                 textAlign: "center",
//               }}
//             >
//               maxVisiblePages: 3
//             </div>
//             <Pagination
//               currentPage={10}
//               totalPages={20}
//               size="medium"
//               maxVisiblePages={3}
//               onPageChange={(page) => console.log("Page:", page)}
//             />
//           </div>
//           <div style={{ width: "100%" }}>
//             <div
//               style={{
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 color: "#666",
//                 textAlign: "center",
//               }}
//             >
//               maxVisiblePages: 5 (default)
//             </div>
//             <Pagination
//               currentPage={10}
//               totalPages={20}
//               size="medium"
//               maxVisiblePages={5}
//               onPageChange={(page) => console.log("Page:", page)}
//             />
//           </div>
//           <div style={{ width: "100%" }}>
//             <div
//               style={{
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 color: "#666",
//                 textAlign: "center",
//               }}
//             >
//               maxVisiblePages: 7
//             </div>
//             <Pagination
//               currentPage={10}
//               totalPages={20}
//               size="medium"
//               maxVisiblePages={7}
//               onPageChange={(page) => console.log("Page:", page)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "모든 size, state, 페이지 수, maxVisiblePages 조합을 체계적으로 보여줍니다.",
//       },
//     },
//   },
// };
