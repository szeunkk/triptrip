import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { DatePicker } from "./index";

/**
 * DatePicker 컴포넌트
 *
 * 기간 선택을 지원하는 재사용 가능한 날짜 선택 컴포넌트입니다.
 *
 * ## Sizes
 * - **small**: 40px 높이, 14px 폰트
 * - **medium**: 48px 높이, 16px 폰트
 *
 * ## Features
 * - **기간 선택**: 시작 날짜와 종료 날짜를 선택할 수 있습니다
 * - **날짜 제약**: 종료 날짜는 시작 날짜 이후만 선택 가능합니다
 * - **포맷 변환**: YYYY-MM-DD 형식을 YYYY.MM.DD로 표시합니다
 * - **네이티브 피커**: 브라우저 기본 날짜 선택기를 활용합니다
 */
const meta = {
  title: "Commons/Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "기간 선택을 지원하는 재사용 가능한 날짜 선택 컴포넌트입니다. 시작 날짜와 종료 날짜를 선택할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "컴포넌트 크기",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "medium" },
      },
    },
    startDate: {
      control: "text",
      description: "시작 날짜 (YYYY-MM-DD 형식)",
      table: {
        type: { summary: "string" },
      },
    },
    endDate: {
      control: "text",
      description: "종료 날짜 (YYYY-MM-DD 형식)",
      table: {
        type: { summary: "string" },
      },
    },
    onStartDateChange: {
      action: "start date changed",
      description: "시작 날짜 변경 핸들러",
      table: {
        type: { summary: "(date: string) => void" },
      },
    },
    onEndDateChange: {
      action: "end date changed",
      description: "종료 날짜 변경 핸들러",
      table: {
        type: { summary: "(date: string) => void" },
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ===================================
// Default Story
// ===================================
export const Default: Story = {
  args: {
    size: "medium",
    startDate: "",
    endDate: "",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
};

// ===================================
// Size Stories
// ===================================
export const SizeSmall: Story = {
  args: {
    size: "small",
    startDate: "",
    endDate: "",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
};

export const SizeMedium: Story = {
  args: {
    size: "medium",
    startDate: "",
    endDate: "",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
};

// ===================================
// State Stories
// ===================================
export const Empty: Story = {
  args: {
    size: "medium",
    startDate: "",
    endDate: "",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
  parameters: {
    docs: {
      description: {
        story:
          "날짜가 선택되지 않은 기본 상태입니다. YYYY.MM.DD 플레이스홀더가 표시됩니다.",
      },
    },
  },
};

export const WithDates: Story = {
  args: {
    size: "medium",
    startDate: "2024-01-01",
    endDate: "2024-01-07",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
  parameters: {
    docs: {
      description: {
        story:
          "시작 날짜와 종료 날짜가 선택된 상태입니다. YYYY.MM.DD 형식으로 표시됩니다.",
      },
    },
  },
};

export const StartDateOnly: Story = {
  args: {
    size: "medium",
    startDate: "2024-01-01",
    endDate: "",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
  parameters: {
    docs: {
      description: {
        story:
          "시작 날짜만 선택된 상태입니다. 종료 날짜는 시작 날짜 이후만 선택 가능합니다.",
      },
    },
  },
};

export const EndDateOnly: Story = {
  args: {
    size: "medium",
    startDate: "",
    endDate: "2024-12-31",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
  parameters: {
    docs: {
      description: {
        story: "종료 날짜만 선택된 상태입니다.",
      },
    },
  },
};

// ===================================
// Interactive Story with State Management
// ===================================
export const Interactive: Story = {
  render: (args) => {
    const [startDate, setStartDate] = useState(args.startDate || "");
    const [endDate, setEndDate] = useState(args.endDate || "");

    const formatDisplayDate = (date: string) => {
      if (!date) return "선택 안 함";
      const [year, month, day] = date.split("-");
      return `${year}년 ${month}월 ${day}일`;
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <DatePicker
          {...args}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(date) => {
            setStartDate(date);
            console.log("Start date changed to:", date);
          }}
          onEndDateChange={(date) => {
            setEndDate(date);
            console.log("End date changed to:", date);
          }}
        />
        <div
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div>시작: {formatDisplayDate(startDate)}</div>
          <div>종료: {formatDisplayDate(endDate)}</div>
        </div>
      </div>
    );
  },
  args: {
    size: "medium",
    startDate: "",
    endDate: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "실제로 날짜를 선택할 수 있는 인터랙티브 예시입니다. 날짜를 클릭하여 기간을 선택할 수 있습니다.",
      },
    },
  },
};

// ===================================
// Use Case Stories
// ===================================
export const TripDates: Story = {
  args: {
    size: "medium",
    startDate: "2024-07-15",
    endDate: "2024-07-20",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
  parameters: {
    docs: {
      description: {
        story:
          "여행 일정 선택 예시입니다. (2024년 7월 15일 ~ 7월 20일, 6일 여행)",
      },
    },
  },
};

export const WeekendTrip: Story = {
  args: {
    size: "medium",
    startDate: "2024-03-23",
    endDate: "2024-03-24",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
  parameters: {
    docs: {
      description: {
        story: "주말 여행 일정 선택 예시입니다. (2박 3일)",
      },
    },
  },
};

export const LongTermTrip: Story = {
  args: {
    size: "medium",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    onStartDateChange: (date) => console.log("Start date changed to:", date),
    onEndDateChange: (date) => console.log("End date changed to:", date),
  },
  parameters: {
    docs: {
      description: {
        story: "장기 여행 일정 선택 예시입니다. (한 달 여행)",
      },
    },
  },
};

// ===================================
// Combination Showcase
// ===================================
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Small Size
        </div>
        <DatePicker
          size="small"
          startDate="2024-01-01"
          endDate="2024-01-07"
          onStartDateChange={(date) => console.log("Start:", date)}
          onEndDateChange={(date) => console.log("End:", date)}
        />
      </div>
      <div>
        <div
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Medium Size
        </div>
        <DatePicker
          size="medium"
          startDate="2024-01-01"
          endDate="2024-01-07"
          onStartDateChange={(date) => console.log("Start:", date)}
          onEndDateChange={(date) => console.log("End:", date)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 size를 한눈에 비교할 수 있습니다.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Empty State (날짜 선택 전)
        </div>
        <DatePicker
          size="medium"
          startDate=""
          endDate=""
          onStartDateChange={(date) => console.log("Start:", date)}
          onEndDateChange={(date) => console.log("End:", date)}
        />
      </div>
      <div>
        <div
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Start Date Only (시작 날짜만)
        </div>
        <DatePicker
          size="medium"
          startDate="2024-01-01"
          endDate=""
          onStartDateChange={(date) => console.log("Start:", date)}
          onEndDateChange={(date) => console.log("End:", date)}
        />
      </div>
      <div>
        <div
          style={{
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Both Selected (기간 선택 완료)
        </div>
        <DatePicker
          size="medium"
          startDate="2024-01-01"
          endDate="2024-01-07"
          onStartDateChange={(date) => console.log("Start:", date)}
          onEndDateChange={(date) => console.log("End:", date)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 상태를 한눈에 비교할 수 있습니다.",
      },
    },
  },
};

export const CompleteShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Small Size Variants */}
      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Small Size
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <DatePicker
            size="small"
            startDate=""
            endDate=""
            onStartDateChange={(date) => console.log("Start:", date)}
            onEndDateChange={(date) => console.log("End:", date)}
          />
          <DatePicker
            size="small"
            startDate="2024-01-01"
            endDate=""
            onStartDateChange={(date) => console.log("Start:", date)}
            onEndDateChange={(date) => console.log("End:", date)}
          />
          <DatePicker
            size="small"
            startDate="2024-01-01"
            endDate="2024-01-07"
            onStartDateChange={(date) => console.log("Start:", date)}
            onEndDateChange={(date) => console.log("End:", date)}
          />
        </div>
      </div>

      {/* Medium Size Variants */}
      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Medium Size
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <DatePicker
            size="medium"
            startDate=""
            endDate=""
            onStartDateChange={(date) => console.log("Start:", date)}
            onEndDateChange={(date) => console.log("End:", date)}
          />
          <DatePicker
            size="medium"
            startDate="2024-01-01"
            endDate=""
            onStartDateChange={(date) => console.log("Start:", date)}
            onEndDateChange={(date) => console.log("End:", date)}
          />
          <DatePicker
            size="medium"
            startDate="2024-01-01"
            endDate="2024-01-07"
            onStartDateChange={(date) => console.log("Start:", date)}
            onEndDateChange={(date) => console.log("End:", date)}
          />
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Use Cases (Medium Size)
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginBottom: "8px",
                fontSize: "14px",
                color: "#666",
                textAlign: "center",
              }}
            >
              주말 여행 (2박 3일)
            </div>
            <DatePicker
              size="medium"
              startDate="2024-03-23"
              endDate="2024-03-24"
              onStartDateChange={(date) => console.log("Start:", date)}
              onEndDateChange={(date) => console.log("End:", date)}
            />
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginBottom: "8px",
                fontSize: "14px",
                color: "#666",
                textAlign: "center",
              }}
            >
              여름 휴가 (6일)
            </div>
            <DatePicker
              size="medium"
              startDate="2024-07-15"
              endDate="2024-07-20"
              onStartDateChange={(date) => console.log("Start:", date)}
              onEndDateChange={(date) => console.log("End:", date)}
            />
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginBottom: "8px",
                fontSize: "14px",
                color: "#666",
                textAlign: "center",
              }}
            >
              장기 여행 (한 달)
            </div>
            <DatePicker
              size="medium"
              startDate="2024-08-01"
              endDate="2024-08-31"
              onStartDateChange={(date) => console.log("Start:", date)}
              onEndDateChange={(date) => console.log("End:", date)}
            />
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginBottom: "8px",
                fontSize: "14px",
                color: "#666",
                textAlign: "center",
              }}
            >
              연말 여행
            </div>
            <DatePicker
              size="medium"
              startDate="2024-12-24"
              endDate="2024-12-31"
              onStartDateChange={(date) => console.log("Start:", date)}
              onEndDateChange={(date) => console.log("End:", date)}
            />
          </div>
        </div>
      </div>

      {/* Interactive Example */}
      <div>
        <h3
          style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}
        >
          Interactive Example
        </h3>
        <div style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
          (날짜를 클릭하여 직접 선택해 보세요)
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "모든 size와 상태 조합을 체계적으로 보여주며, 실제 여행 일정 선택 예시도 포함합니다.",
      },
    },
  },
};
