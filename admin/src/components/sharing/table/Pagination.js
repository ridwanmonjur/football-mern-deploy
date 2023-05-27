import { ButtonPanel } from "../form";

export const Pagination = ({
    isActive
})=> (
<div className="btn-group btn-primary">
  <ButtonPanel classNames="btn">«</ButtonPanel>
  <ButtonPanel classNames="btn btn-md">1</ButtonPanel>
  <ButtonPanel classNames="btn btn-md">2</ButtonPanel>
  <ButtonPanel classNames="btn btn-md">3</ButtonPanel>
  <ButtonPanel classNames="btn btn-md">4</ButtonPanel>
  <ButtonPanel classNames="btn">»</ButtonPanel>
</div>
)