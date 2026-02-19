import { InputBoardAddress, Inputfield, Textareafield } from ".";

const meta = {
  title: "components/input",
  component: Inputfield,
  tags: ["autodocs"],
};

export default meta;

export const inputfields = {
  render: () => {
    return (
      <>
        <Inputfield
          type="text"
          label="작성자"
          required
          placeholder="작성자를 입력해주세요."
        />
        <Textareafield
          label="내용"
          placeholder="내용을 입력해주세요."
        ></Textareafield>
        <InputBoardAddress
          placeholder="주소를 입력해주세요."
          placeholder_2="상세주소"
        />
      </>
    );
  },
};
