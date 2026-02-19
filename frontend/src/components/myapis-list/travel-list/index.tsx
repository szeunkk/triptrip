import { ITravels } from "./hook";

export default function TravelList({
  travels,
  onClickTravel,
}: {
  travels: ITravels[];
  onClickTravel: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <>
      {travels?.map((el) => {
        return (
          <div
            id={el.travel_id}
            key={el.travel_id}
            style={{ width: "600px", margin: "16px", border: "1px solid gray" }}
            onClick={onClickTravel}
          >
            <div>{el.destination}</div>
            <div>{el.title}</div>
            <div>{el.startDate}</div>
            <div>{el.endDate}</div>
          </div>
        );
      })}
    </>
  );
}
