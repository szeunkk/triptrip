// import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// import { Input } from "./index";

// /**
//  * Input 컴포넌트
//  *
//  * 다양한 variant, size, state를 지원하는 재사용 가능한 입력 컴포넌트입니다.
//  *
//  * ## Variants
//  * - **outlined**: 테두리가 있는 기본 스타일
//  * - **filled**: 배경색이 있는 채워진 스타일
//  *
//  * ## Sizes
//  * - **small**: 40px 높이, 14px 폰트
//  * - **medium**: 48px 높이, 18px 폰트
//  *
//  * ## States
//  * - **default**: 기본 상태 (값이 없을 때)
//  * - **filled**: 값이 입력된 상태
//  * - **error**: 에러 상태 (error prop 전달 시)
//  * - **read-only**: 읽기 전용 상태
//  * - **disabled**: 비활성화 상태
//  */
// const meta = {
//   title: "Commons/Components/Input",
//   component: Input,
//   parameters: {
//     layout: "centered",
//     docs: {
//       description: {
//         component:
//           "다양한 variant, size, state를 지원하는 재사용 가능한 입력 컴포넌트입니다.",
//       },
//     },
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     variant: {
//       control: "select",
//       options: ["outlined", "filled"],
//       description: "입력 필드의 스타일 변형",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "outlined" },
//       },
//     },
//     size: {
//       control: "select",
//       options: ["small", "medium"],
//       description: "입력 필드의 크기",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "medium" },
//       },
//     },
//     label: {
//       control: "text",
//       description: "레이블 텍스트",
//       table: {
//         type: { summary: "string" },
//       },
//     },
//     required: {
//       control: "boolean",
//       description: "필수 입력 필드 여부",
//       table: {
//         type: { summary: "boolean" },
//         defaultValue: { summary: "false" },
//       },
//     },
//     error: {
//       control: "text",
//       description: "에러 메시지",
//       table: {
//         type: { summary: "string" },
//       },
//     },
//     readOnly: {
//       control: "boolean",
//       description: "읽기 전용 상태",
//       table: {
//         type: { summary: "boolean" },
//         defaultValue: { summary: "false" },
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
//     placeholder: {
//       control: "text",
//       description: "플레이스홀더 텍스트",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "내용을 입력해 주세요." },
//       },
//     },
//     value: {
//       control: "text",
//       description: "입력 값",
//       table: {
//         type: { summary: "string" },
//       },
//     },
//   },
// } satisfies Meta<typeof Input>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // ===================================
// // Default Story
// // ===================================
// export const Default: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "내용을 입력해 주세요.",
//   },
// };

// // ===================================
// // Variant Stories
// // ===================================
// export const Outlined: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "Outlined Input",
//   },
// };

// export const Filled: Story = {
//   args: {
//     variant: "filled",
//     size: "medium",
//     placeholder: "Filled Input",
//   },
// };

// // ===================================
// // Size Stories
// // ===================================
// export const SizeSmall: Story = {
//   args: {
//     variant: "outlined",
//     size: "small",
//     placeholder: "Small Input",
//   },
// };

// export const SizeMedium: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "Medium Input",
//   },
// };

// // ===================================
// // State Stories
// // ===================================
// export const StateDefault: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "Default State",
//     value: "",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "값이 입력되지 않은 기본 상태입니다.",
//       },
//     },
//   },
// };

// export const StateFilled: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "Filled State",
//     value: "입력된 텍스트",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "값이 입력된 상태입니다.",
//       },
//     },
//   },
// };

// export const StateError: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "Error State",
//     value: "잘못된 입력",
//     error: "올바른 형식으로 입력해 주세요.",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "에러가 발생한 상태입니다. 에러 메시지가 하단에 표시됩니다.",
//       },
//     },
//   },
// };

// export const StateReadOnly: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "Read Only State",
//     value: "읽기 전용 텍스트",
//     readOnly: true,
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "읽기 전용 상태입니다. 수정할 수 없습니다.",
//       },
//     },
//   },
// };

// export const StateDisabled: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     placeholder: "Disabled State",
//     disabled: true,
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "비활성화 상태입니다. 상호작용할 수 없습니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Label Stories
// // ===================================
// export const WithLabel: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     label: "이메일",
//     placeholder: "example@email.com",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "레이블이 있는 입력 필드입니다.",
//       },
//     },
//   },
// };

// export const RequiredLabel: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     label: "비밀번호",
//     required: true,
//     placeholder: "8자 이상 입력해 주세요.",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "필수 입력 필드입니다. 레이블에 * 표시가 나타납니다.",
//       },
//     },
//   },
// };

// export const WithLabelAndError: Story = {
//   args: {
//     variant: "outlined",
//     size: "medium",
//     label: "닉네임",
//     required: true,
//     value: "ab",
//     error: "닉네임은 3자 이상이어야 합니다.",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "레이블과 에러 메시지가 함께 표시됩니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Combination Showcase
// // ===================================
// export const AllVariants: Story = {
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "16px",
//         width: "300px",
//       }}
//     >
//       <Input variant="outlined" placeholder="Outlined Input" />
//       <Input variant="filled" placeholder="Filled Input" />
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "모든 variant를 한눈에 비교할 수 있습니다.",
//       },
//     },
//   },
// };

// export const AllSizes: Story = {
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "16px",
//         width: "300px",
//       }}
//     >
//       <Input variant="outlined" size="small" placeholder="Small Size" />
//       <Input variant="outlined" size="medium" placeholder="Medium Size" />
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
//         width: "300px",
//       }}
//     >
//       <Input variant="outlined" placeholder="Default State" value="" />
//       <Input
//         variant="outlined"
//         placeholder="Filled State"
//         value="입력된 텍스트"
//       />
//       <Input
//         variant="outlined"
//         placeholder="Error State"
//         value="잘못된 입력"
//         error="올바른 형식으로 입력해 주세요."
//       />
//       <Input
//         variant="outlined"
//         placeholder="Read Only State"
//         value="읽기 전용 텍스트"
//         readOnly
//       />
//       <Input variant="outlined" placeholder="Disabled State" disabled />
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
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "32px",
//         width: "400px",
//       }}
//     >
//       {/* Outlined Variant */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Outlined Variant
//         </h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <Input variant="outlined" size="medium" placeholder="Medium Size" />
//           <Input variant="outlined" size="small" placeholder="Small Size" />
//           <Input
//             variant="outlined"
//             size="medium"
//             label="레이블 있음"
//             placeholder="With Label"
//           />
//           <Input
//             variant="outlined"
//             size="medium"
//             label="필수 입력"
//             required
//             placeholder="Required Field"
//           />
//           <Input
//             variant="outlined"
//             size="medium"
//             value="입력된 값"
//             placeholder="Filled State"
//           />
//           <Input
//             variant="outlined"
//             size="medium"
//             value="에러 발생"
//             error="올바른 형식으로 입력해 주세요."
//           />
//           <Input variant="outlined" size="medium" value="읽기 전용" readOnly />
//           <Input
//             variant="outlined"
//             size="medium"
//             placeholder="Disabled"
//             disabled
//           />
//         </div>
//       </div>

//       {/* Filled Variant */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Filled Variant
//         </h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <Input variant="filled" size="medium" placeholder="Medium Size" />
//           <Input variant="filled" size="small" placeholder="Small Size" />
//           <Input
//             variant="filled"
//             size="medium"
//             label="레이블 있음"
//             placeholder="With Label"
//           />
//           <Input
//             variant="filled"
//             size="medium"
//             label="필수 입력"
//             required
//             placeholder="Required Field"
//           />
//           <Input
//             variant="filled"
//             size="medium"
//             value="입력된 값"
//             placeholder="Filled State"
//           />
//           <Input
//             variant="filled"
//             size="medium"
//             value="에러 발생"
//             error="올바른 형식으로 입력해 주세요."
//           />
//           <Input variant="filled" size="medium" value="읽기 전용" readOnly />
//           <Input
//             variant="filled"
//             size="medium"
//             placeholder="Disabled"
//             disabled
//           />
//         </div>
//       </div>

//       {/* Form Example */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Form Example
//         </h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <Input
//             variant="outlined"
//             size="medium"
//             label="이메일"
//             required
//             placeholder="example@email.com"
//           />
//           <Input
//             variant="outlined"
//             size="medium"
//             label="비밀번호"
//             required
//             type="password"
//             placeholder="8자 이상 입력해 주세요."
//           />
//           <Input
//             variant="outlined"
//             size="medium"
//             label="닉네임"
//             required
//             value="ab"
//             error="닉네임은 3자 이상이어야 합니다."
//           />
//           <Input
//             variant="outlined"
//             size="medium"
//             label="자기소개"
//             placeholder="간단한 소개를 입력해 주세요."
//           />
//         </div>
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "모든 variant, size, state 조합을 체계적으로 보여주며, 실제 폼 예시도 포함합니다.",
//       },
//     },
//   },
// };
