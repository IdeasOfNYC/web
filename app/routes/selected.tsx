import { useEffect } from "react";

export default function SelectedIdeas() {
  useEffect(() => {
    window.location.href =
      "https://www.participate.nyc.gov/processes/Citywidepb2023/f/26/proposals";
  }, []);

  return null;
}