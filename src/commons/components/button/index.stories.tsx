// import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// import { Button } from "./index";

// /**
//  * Button 컴포넌트
//  *
//  * 다양한 variant, size, shape를 지원하는 재사용 가능한 버튼 컴포넌트입니다.
//  *
//  * ## Variants
//  * - **primary**: 주요 액션에 사용 (브랜드 블루)
//  * - **secondary**: 보조 액션에 사용 (블랙)
//  * - **tertiary**: 제3 우선순위 액션에 사용 (화이트 배경, 블랙 테두리)
//  * - **ghost**: 최소한의 스타일, 인라인 액션에 사용
//  *
//  * ## Sizes
//  * - **small**: 40px 높이, 14px 폰트
//  * - **medium**: 48px 높이, 18px 폰트
//  * - **ghost variant**: size prop 무시, 항상 24px 높이, 13px 폰트
//  *
//  * ## Shapes
//  * - **rectangle**: 8px border-radius
//  * - **pill**: 100px border-radius (완전한 원형)
//  * - **ghost variant**: shape prop 무시, 항상 4px border-radius
//  */
// const meta = {
//   title: "Commons/Components/Button",
//   component: Button,
//   parameters: {
//     layout: "centered",
//     docs: {
//       description: {
//         component:
//           "다양한 variant, size, shape를 지원하는 재사용 가능한 버튼 컴포넌트입니다.",
//       },
//     },
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     variant: {
//       control: "select",
//       options: ["primary", "secondary", "tertiary", "ghost"],
//       description: "버튼의 스타일 변형",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "primary" },
//       },
//     },
//     size: {
//       control: "select",
//       options: ["small", "medium"],
//       description: "버튼의 크기 (ghost variant는 무시)",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "medium" },
//       },
//     },
//     shape: {
//       control: "select",
//       options: ["rectangle", "pill"],
//       description: "버튼의 모양 (ghost variant는 무시)",
//       table: {
//         type: { summary: "string" },
//         defaultValue: { summary: "rectangle" },
//       },
//     },
//     disabled: {
//       control: "boolean",
//       description: "버튼의 비활성화 상태",
//       table: {
//         type: { summary: "boolean" },
//         defaultValue: { summary: "false" },
//       },
//     },
//     children: {
//       control: "text",
//       description: "버튼 내부 텍스트",
//     },
//   },
// } satisfies Meta<typeof Button>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// // ===================================
// // Default Story
// // ===================================
// export const Default: Story = {
//   args: {
//     children: "Button",
//     variant: "primary",
//     size: "medium",
//     shape: "rectangle",
//     disabled: false,
//   },
// };

// // ===================================
// // Variant Stories
// // ===================================
// export const Primary: Story = {
//   args: {
//     children: "Primary Button",
//     variant: "primary",
//     size: "medium",
//     shape: "rectangle",
//   },
// };

// export const Secondary: Story = {
//   args: {
//     children: "Secondary Button",
//     variant: "secondary",
//     size: "medium",
//     shape: "rectangle",
//   },
// };

// export const Tertiary: Story = {
//   args: {
//     children: "Tertiary Button",
//     variant: "tertiary",
//     size: "medium",
//     shape: "rectangle",
//   },
// };

// export const Ghost: Story = {
//   args: {
//     children: "Ghost Button",
//     variant: "ghost",
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "Ghost variant는 size와 shape prop을 무시합니다. 항상 24px 높이, 4px border-radius를 가집니다.",
//       },
//     },
//   },
// };

// // ===================================
// // Size Stories
// // ===================================
// export const SizeSmall: Story = {
//   args: {
//     children: "Small Button",
//     variant: "primary",
//     size: "small",
//     shape: "rectangle",
//   },
// };

// export const SizeMedium: Story = {
//   args: {
//     children: "Medium Button",
//     variant: "primary",
//     size: "medium",
//     shape: "rectangle",
//   },
// };

// // ===================================
// // Shape Stories
// // ===================================
// export const ShapeRectangle: Story = {
//   args: {
//     children: "Rectangle Button",
//     variant: "primary",
//     size: "medium",
//     shape: "rectangle",
//   },
// };

// export const ShapePill: Story = {
//   args: {
//     children: "Pill Button",
//     variant: "primary",
//     size: "medium",
//     shape: "pill",
//   },
// };

// // ===================================
// // Disabled Stories
// // ===================================
// export const PrimaryDisabled: Story = {
//   args: {
//     children: "Disabled Primary",
//     variant: "primary",
//     size: "medium",
//     shape: "rectangle",
//     disabled: true,
//   },
// };

// export const SecondaryDisabled: Story = {
//   args: {
//     children: "Disabled Secondary",
//     variant: "secondary",
//     size: "medium",
//     shape: "rectangle",
//     disabled: true,
//   },
// };

// export const TertiaryDisabled: Story = {
//   args: {
//     children: "Disabled Tertiary",
//     variant: "tertiary",
//     size: "medium",
//     shape: "rectangle",
//     disabled: true,
//   },
// };

// export const GhostDisabled: Story = {
//   args: {
//     children: "Disabled Ghost",
//     variant: "ghost",
//     disabled: true,
//   },
// };

// // ===================================
// // Combination Showcase
// // ===================================
// export const AllVariants: Story = {
//   render: () => (
//     <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
//       <Button variant="primary">Primary</Button>
//       <Button variant="secondary">Secondary</Button>
//       <Button variant="tertiary">Tertiary</Button>
//       <Button variant="ghost">Ghost</Button>
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
//         gap: "16px",
//         alignItems: "center",
//         flexWrap: "wrap",
//       }}
//     >
//       <Button variant="primary" size="small">
//         Small
//       </Button>
//       <Button variant="primary" size="medium">
//         Medium
//       </Button>
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

// export const AllShapes: Story = {
//   render: () => (
//     <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
//       <Button variant="primary" shape="rectangle">
//         Rectangle
//       </Button>
//       <Button variant="primary" shape="pill">
//         Pill
//       </Button>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "모든 shape를 한눈에 비교할 수 있습니다.",
//       },
//     },
//   },
// };

// export const AllDisabledStates: Story = {
//   render: () => (
//     <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
//       <Button variant="primary" disabled>
//         Primary Disabled
//       </Button>
//       <Button variant="secondary" disabled>
//         Secondary Disabled
//       </Button>
//       <Button variant="tertiary" disabled>
//         Tertiary Disabled
//       </Button>
//       <Button variant="ghost" disabled>
//         Ghost Disabled
//       </Button>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "모든 variant의 disabled 상태를 한눈에 비교할 수 있습니다.",
//       },
//     },
//   },
// };

// export const CompleteShowcase: Story = {
//   render: () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
//       {/* Primary Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Primary Variant
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "center",
//           }}
//         >
//           <Button variant="primary" size="medium" shape="rectangle">
//             Medium Rectangle
//           </Button>
//           <Button variant="primary" size="medium" shape="pill">
//             Medium Pill
//           </Button>
//           <Button variant="primary" size="small" shape="rectangle">
//             Small Rectangle
//           </Button>
//           <Button variant="primary" size="small" shape="pill">
//             Small Pill
//           </Button>
//           <Button variant="primary" size="medium" shape="rectangle" disabled>
//             Disabled
//           </Button>
//         </div>
//       </div>

//       {/* Secondary Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Secondary Variant
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "center",
//           }}
//         >
//           <Button variant="secondary" size="medium" shape="rectangle">
//             Medium Rectangle
//           </Button>
//           <Button variant="secondary" size="medium" shape="pill">
//             Medium Pill
//           </Button>
//           <Button variant="secondary" size="small" shape="rectangle">
//             Small Rectangle
//           </Button>
//           <Button variant="secondary" size="small" shape="pill">
//             Small Pill
//           </Button>
//           <Button variant="secondary" size="medium" shape="rectangle" disabled>
//             Disabled
//           </Button>
//         </div>
//       </div>

//       {/* Tertiary Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Tertiary Variant
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "center",
//           }}
//         >
//           <Button variant="tertiary" size="medium" shape="rectangle">
//             Medium Rectangle
//           </Button>
//           <Button variant="tertiary" size="medium" shape="pill">
//             Medium Pill
//           </Button>
//           <Button variant="tertiary" size="small" shape="rectangle">
//             Small Rectangle
//           </Button>
//           <Button variant="tertiary" size="small" shape="pill">
//             Small Pill
//           </Button>
//           <Button variant="tertiary" size="medium" shape="rectangle" disabled>
//             Disabled
//           </Button>
//         </div>
//       </div>

//       {/* Ghost Variants */}
//       <div>
//         <h3
//           style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
//         >
//           Ghost Variant (size와 shape 무시)
//         </h3>
//         <div
//           style={{
//             display: "flex",
//             gap: "16px",
//             flexWrap: "wrap",
//             alignItems: "center",
//           }}
//         >
//           <Button variant="ghost">Ghost Active</Button>
//           <Button variant="ghost" disabled>
//             Ghost Disabled
//           </Button>
//         </div>
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: "모든 variant, size, shape 조합을 체계적으로 보여줍니다.",
//       },
//     },
//   },
// };
