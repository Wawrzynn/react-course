import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent, queryClient } from "../../util/http.js";
import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = (
      <div id="events-detail-content" className="center">
        Fetching event data...
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="events-detail-content" className="center">
        <ErrorBlock
          title="An error occurred while fetching the event"
          message={error.info?.message || "Failed to fetch events data."}
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event?</p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting event...</p>}
            {!isPendingDeletion && (
              <>
                <button
                  className="button-text"
                  type="button"
                  onClick={handleStopDelete}
                >
                  Cancel
                </button>
                <button className="button" type="button" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete event"
              message={deleteError.info?.message || "Failed to delete event."}
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
