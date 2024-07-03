import Icon from "@/components/icon";
import useGetSingleAdmin from "@/hooks/users/useGetSingleAdmin";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function MainSection({
  email,
  setStage,
}: {
  email: string;
  setStage?: () => void;
}) {
  const userSearch = useGetSingleAdmin(email);

  return (
    <div className="space-y-4">
      {userSearch.isLoading && (
        <div className="mt-2 flex items-center space-x-2 text-sm font-light">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin duration-700"
            >
              <path
                d="M8.00065 1.3335V2.66683M11.334 2.22683L10.6673 3.3815M13.774 4.66683L12.6193 5.3335M14.6673 8.00016H13.334M13.774 11.3335L12.6193 10.6668M11.334 13.7735L10.6673 12.6188M8.00065 14.6668V13.3335M4.66732 13.7735L5.33398 12.6188M2.22732 11.3335L3.38198 10.6668M1.33398 8.00016H2.66732M2.22732 4.66683L3.38198 5.3335M4.66732 2.22683L5.33398 3.3815"
                stroke="#142633"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p>Fetching User details</p>
        </div>
      )}
      {userSearch?.value?.items.length && (
        <div className="mt-2 flex max-w-fit items-center gap-2 rounded-[4px] bg-[#F5F8FA] px-2 py-1 text-obs-blue">
          <Icon IconComp={UserCircleIcon} boxSize={4} />
          <p className="text-sm capitalize text-obs-blue">Nathaniel Collins</p>
        </div>
      )}
    </div>
  );
}

export default MainSection;
