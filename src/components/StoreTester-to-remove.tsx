import { changeValue } from "@/redux/reducers/example-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Text } from "@ledgerhq/react-ui/index";

export const Storetester = () => {
  const state = useAppSelector((state) => state.exampleReducer.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Text mr={3}>Current value : {state}</Text>

      <button onClick={() => dispatch(changeValue("NextValue"))}>Change value</button>
    </div>
  );
};
