import { cn } from "../lib/utils";
import Loading from "./Loading";

const LoadingScreen = ({height="h-screen"}:{height?:string}) => {
  return (
    <div className={cn("flex justify-center items-center",height)}>
      <Loading />
    </div>
  );
};

export default LoadingScreen;
