import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent, queryClient } from "../../utils/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      navigate("/events");
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <span>Submitting...</span>}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message ?? "Failed to fetch events"}
        />
      )}
    </Modal>
  );
}
