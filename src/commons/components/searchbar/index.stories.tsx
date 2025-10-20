// import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// import { SearchBar } from "./index";

// /**
//  * SearchBar 컴포넌트
//  *
//  * 다양한 variant와 size를 지원하는 재사용 가능한 검색바 컴포넌트입니다.
//  *
//  * ## Variants
//  * - **default**: 기본 상태 (값이 없을 때)
//  * - **selected**: 선택된 상태 (포커스가 있을 때)
//  * - **typing**: 입력 중 상태
//  * - **filled**: 값이 입력된 상태
//  *
//  * ## Sizes
//  * - **small**: 40px 높이, 14px 폰트
//  * - **medium**: 48px 높이, 18px 폰트
//  */
// const meta = {
//   title: "Commons/Components/SearchBar",
//   component: SearchBar,
//   parameters: {
//     layout: "centered",
//     docs: {
//       description: {
//         component:
//           "다양한 variant와 size를 지원하는 재사용 가능한 검색바 컴포넌트입니다.",
//       },
//     },
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     variant: {
//       control: "select",
//       options: ["default", "selected", "typing", "filled"],
//       description: "검색바의 스타일 변형",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "default" },
//       },
//     },
//     size: {
//       control: "select",
//       options: ["small", "medium"],
//       description: "검색바의 크기",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "medium" },
//       },
//     },
//     placeholder: {
//       control: "text",
//       description: "플레이스홀더 텍스트",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "제목을 검색해 주세요." },
//       },
//     },
//     value: {
//       control: "text",
//       description: "검색 입력 값",
//       table: {
//         type: { summary: "string" },
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
// } satisfies Meta<typeof SearchBar>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // ===================================
// // Default Story
// // ===================================
// export const Default: Story = {
//   args: {
//     variant: "default",
//     size: "medium",
//     placeholder: "제목을 검색해 주세요.",
//   },
// };

// // ===================================
// // Variant Stories
// // ===================================
// export const VariantDefault: Story = {
//   args: {
//     variant: "default",
//     size: "medium",
//     placeholder: "제목을 검색해 주세요.",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "값이 입력되지 않은 기본 상태입니다.",
//       },
//     },
//   },
// };

// export const VariantSelected: Story = {
//   args: {
//     variant: "selected",
//     size: "medium",
//     placeholder: "제목을 검색해 주세요.",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "검색바가 선택되어 포커스가 있는 상태입니다.",
//       },
//     },
//   },
// };

// export const VariantTyping: Story = {
//   args: {
//     variant: "typing",
//     size: "medium",
//     placeholder: "제목을 검색해 주세요.",
//     value: "여행",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "사용자가 검색어를 입력 중인 상태입니다.",
//       },
//     },
//   },
// };

// export const VariantFilled: Story = {
//   args: {
//     variant: "filled",
//     size: "medium",
//     placeholder: "제목을 검색해 주세요.",
//     value: "여행 계획",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "검색어가 입력되어 완료된 상태입니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Size Stories
// // ===================================
// export const SizeSmall: Story = {
//   args: {
//     variant: "default",
//     size: "small",
//     placeholder: "제목을 검색해 주세요.",
//   },
// };

// export const SizeMedium: Story = {
//   args: {
//     variant: "default",
//     size: "medium",
//     placeholder: "제목을 검색해 주세요.",
//   },
// };

// // ===================================
// // State Stories
// // ===================================
// export const Disabled: Story = {
//   args: {
//     variant: "default",
//     size: "medium",
//     placeholder: "제목을 검색해 주세요.",
//     disabled: true,
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: "비활성화된 상태입니다. 상호작용할 수 없습니다.",
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
//         width: "400px",
//       }}
//     >
//       <SearchBar
//         variant="default"
//         placeholder="Default - 제목을 검색해 주세요."
//       />
//       <SearchBar
//         variant="selected"
//         placeholder="Selected - 제목을 검색해 주세요."
//       />
//       <SearchBar variant="typing" value="여행" placeholder="Typing" />
//       <SearchBar variant="filled" value="여행 계획" placeholder="Filled" />
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
//         width: "400px",
//       }}
//     >
//       <SearchBar
//         variant="default"
//         size="small"
//         placeholder="Small - 제목을 검색해 주세요."
//       />
//       <SearchBar
//         variant="default"
//         size="medium"
//         placeholder="Medium - 제목을 검색해 주세요."
//       />
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

// export const CompleteShowcase: Story = {
//   render: () => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "32px",
//         width: "500px",
//       }}
//     >
//       {/* Size Comparison */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Size Comparison
//         </h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <SearchBar variant="default" size="small" placeholder="Small Size" />
//           <SearchBar
//             variant="default"
//             size="medium"
//             placeholder="Medium Size"
//           />
//         </div>
//       </div>

//       {/* Default Variant States */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Medium Size - All Variants
//         </h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <SearchBar
//             variant="default"
//             size="medium"
//             placeholder="Default - 제목을 검색해 주세요."
//           />
//           <SearchBar
//             variant="selected"
//             size="medium"
//             placeholder="Selected - 제목을 검색해 주세요."
//           />
//           <SearchBar
//             variant="typing"
//             size="medium"
//             value="여행"
//             placeholder="Typing"
//           />
//           <SearchBar
//             variant="filled"
//             size="medium"
//             value="여행 계획"
//             placeholder="Filled"
//           />
//           <SearchBar
//             variant="default"
//             size="medium"
//             placeholder="Disabled"
//             disabled
//           />
//         </div>
//       </div>

//       {/* Small Variant States */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Small Size - All Variants
//         </h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <SearchBar
//             variant="default"
//             size="small"
//             placeholder="Default - 제목을 검색해 주세요."
//           />
//           <SearchBar
//             variant="selected"
//             size="small"
//             placeholder="Selected - 제목을 검색해 주세요."
//           />
//           <SearchBar
//             variant="typing"
//             size="small"
//             value="여행"
//             placeholder="Typing"
//           />
//           <SearchBar
//             variant="filled"
//             size="small"
//             value="여행 계획"
//             placeholder="Filled"
//           />
//           <SearchBar
//             variant="default"
//             size="small"
//             placeholder="Disabled"
//             disabled
//           />
//         </div>
//       </div>

//       {/* Usage Examples */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Usage Examples
//         </h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
//           <SearchBar
//             variant="default"
//             size="medium"
//             placeholder="게시글 제목을 검색해 주세요."
//           />
//           <SearchBar
//             variant="default"
//             size="medium"
//             placeholder="여행지를 검색해 주세요."
//           />
//           <SearchBar
//             variant="default"
//             size="medium"
//             placeholder="닉네임을 검색해 주세요."
//           />
//           <SearchBar
//             variant="filled"
//             size="medium"
//             value="제주도 여행"
//             placeholder="검색"
//           />
//         </div>
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "모든 variant, size 조합을 체계적으로 보여주며, 실제 사용 예시도 포함합니다.",
//       },
//     },
//   },
// };
