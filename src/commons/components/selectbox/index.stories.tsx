// import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// import { SelectBox } from "./index";
// import { useState } from "react";

// /**
//  * SelectBox 컴포넌트
//  *
//  * 드롭다운 형태의 선택 컴포넌트입니다.
//  *
//  * ## Open States
//  * - **true**: 드롭다운 메뉴가 열린 상태
//  * - **false**: 드롭다운 메뉴가 닫힌 상태
//  *
//  * ## States
//  * - **default**: 기본 상태
//  * - **hover**: 호버 상태
//  * - **active**: 활성화 상태
//  *
//  * ## Sizes
//  * - **small**: 작은 크기 (32px 높이)
//  * - **medium**: 중간 크기 (48px 높이)
//  */
// const meta = {
//   title: "Commons/Components/SelectBox",
//   component: SelectBox,
//   parameters: {
//     layout: "centered",
//     docs: {
//       description: {
//         component:
//           "드롭다운 형태의 선택 컴포넌트입니다. open, state, size 등 다양한 상태를 지원합니다.",
//       },
//     },
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     open: {
//       control: "boolean",
//       description: "드롭다운 열림/닫힘 상태",
//       table: {
//         type: { summary: "boolean" },
//         defaultValue: { summary: "false" },
//       },
//     },
//     state: {
//       control: "select",
//       options: ["default", "hover", "active"],
//       description: "인터랙션 상태",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "default" },
//       },
//     },
//     size: {
//       control: "select",
//       options: ["small", "medium"],
//       description: "컴포넌트 크기",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "medium" },
//       },
//     },
//     value: {
//       control: "text",
//       description: "선택된 값",
//       table: {
//         type: { summary: "string | number" },
//       },
//     },
//     placeholder: {
//       control: "text",
//       description: "플레이스홀더 텍스트",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "내용입력" },
//       },
//     },
//     disabled: {
//       control: "boolean",
//       description: "비활성화 상태",
//       table: {
//         type: { summary: "boolean" },
//         defaultValue: { summary: "false" },
//       },
//     },
//   },
// } satisfies Meta<typeof SelectBox>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // 샘플 옵션 데이터
// const sampleOptions = [
//   { value: "option1", label: "옵션 1" },
//   { value: "option2", label: "옵션 2" },
//   { value: "option3", label: "옵션 3" },
//   { value: "option4", label: "옵션 4" },
//   { value: "option5", label: "옵션 5" },
// ];

// const cityOptions = [
//   { value: "seoul", label: "서울" },
//   { value: "busan", label: "부산" },
//   { value: "incheon", label: "인천" },
//   { value: "daegu", label: "대구" },
//   { value: "daejeon", label: "대전" },
// ];

// // ===================================
// // Default Story
// // ===================================
// export const Default: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     state: "default",
//     disabled: false,
//   },
// };

// // ===================================
// // Size Stories
// // ===================================
// export const SizeSmall: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "small",
//     state: "default",
//   },
// };

// export const SizeMedium: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     state: "default",
//   },
// };

// // ===================================
// // State Stories
// // ===================================
// export const StateDefault: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     state: "default",
//   },
// };

// export const StateHover: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     state: "hover",
//   },
// };

// export const StateActive: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     state: "active",
//   },
// };

// // ===================================
// // Open State Stories
// // ===================================
// export const ClosedState: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     open: false,
//   },
// };

// export const OpenedState: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     open: true,
//   },
// };

// // ===================================
// // Value Stories
// // ===================================
// export const WithValue: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     value: "option2",
//   },
// };

// export const WithoutValue: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//   },
// };

// // ===================================
// // Disabled State
// // ===================================
// export const Disabled: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     disabled: true,
//   },
// };

// export const DisabledWithValue: Story = {
//   args: {
//     placeholder: "내용입력",
//     options: sampleOptions,
//     size: "medium",
//     value: "option3",
//     disabled: true,
//   },
// };

// // ===================================
// // Interactive Example
// // ===================================
// export const Interactive: Story = {
//   render: () => {
//     const [value, setValue] = useState<string | number>("");

//     return (
//       <div style={{ width: "300px" }}>
//         <SelectBox
//           placeholder="도시를 선택하세요"
//           options={cityOptions}
//           value={value}
//           onSelect={(newValue) => setValue(newValue)}
//           size="medium"
//         />
//         <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
//           선택된 값: {value || "(없음)"}
//         </p>
//       </div>
//     );
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "실제로 동작하는 SelectBox 컴포넌트입니다. 옵션을 선택하면 값이 변경됩니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Combination Showcase
// // ===================================
// export const AllSizes: Story = {
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "16px",
//         alignItems: "flex-start",
//       }}
//     >
//       <div style={{ width: "300px" }}>
//         <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
//           Small Size
//         </p>
//         <SelectBox
//           placeholder="Small 선택"
//           options={sampleOptions}
//           size="small"
//         />
//       </div>
//       <div style={{ width: "300px" }}>
//         <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
//           Medium Size
//         </p>
//         <SelectBox
//           placeholder="Medium 선택"
//           options={sampleOptions}
//           size="medium"
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
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "16px",
//         alignItems: "flex-start",
//       }}
//     >
//       <div style={{ width: "300px" }}>
//         <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
//           Default State
//         </p>
//         <SelectBox
//           placeholder="Default 상태"
//           options={sampleOptions}
//           state="default"
//           size="medium"
//         />
//       </div>
//       <div style={{ width: "300px" }}>
//         <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
//           Hover State
//         </p>
//         <SelectBox
//           placeholder="Hover 상태"
//           options={sampleOptions}
//           state="hover"
//           size="medium"
//         />
//       </div>
//       <div style={{ width: "300px" }}>
//         <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
//           Active State
//         </p>
//         <SelectBox
//           placeholder="Active 상태"
//           options={sampleOptions}
//           state="active"
//           size="medium"
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

// export const AllOpenStates: Story = {
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "100px",
//         alignItems: "flex-start",
//       }}
//     >
//       <div style={{ width: "300px" }}>
//         <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
//           Closed State
//         </p>
//         <SelectBox
//           placeholder="닫힌 상태"
//           options={sampleOptions}
//           open={false}
//           size="medium"
//         />
//       </div>
//       <div style={{ width: "300px" }}>
//         <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
//           Opened State
//         </p>
//         <SelectBox
//           placeholder="열린 상태"
//           options={sampleOptions}
//           open={true}
//           size="medium"
//         />
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "드롭다운 열림/닫힘 상태를 한눈에 비교할 수 있습니다.",
//       },
//     },
//   },
// };

// export const CompleteShowcase: Story = {
//   render: () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
//       {/* Size Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Size Variants
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "flex-start",
//           }}
//         >
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Small Size"
//               options={sampleOptions}
//               size="small"
//             />
//           </div>
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Medium Size"
//               options={sampleOptions}
//               size="medium"
//             />
//           </div>
//         </div>
//       </div>

//       {/* State Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           State Variants
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "flex-start",
//           }}
//         >
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Default State"
//               options={sampleOptions}
//               state="default"
//               size="medium"
//             />
//           </div>
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Hover State"
//               options={sampleOptions}
//               state="hover"
//               size="medium"
//             />
//           </div>
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Active State"
//               options={sampleOptions}
//               state="active"
//               size="medium"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Value Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Value Variants
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "flex-start",
//           }}
//         >
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Without Value"
//               options={sampleOptions}
//               size="medium"
//             />
//           </div>
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="With Value"
//               options={sampleOptions}
//               value="option2"
//               size="medium"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Disabled Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Disabled Variants
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "flex-start",
//           }}
//         >
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Disabled Empty"
//               options={sampleOptions}
//               size="medium"
//               disabled
//             />
//           </div>
//           <div style={{ width: "280px" }}>
//             <SelectBox
//               placeholder="Disabled With Value"
//               options={sampleOptions}
//               value="option3"
//               size="medium"
//               disabled
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "모든 variant를 체계적으로 보여줍니다.",
//       },
//     },
//   },
// };

// Default export for ESLint
export default {};

// Story export for ESLint
export const Default = {};
