import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncOrders,
  canceledOrder,
  deliveredOrder,
  orderInProgress,
  ordersSelector,
} from "./ordersSlice";
import {
  Dropdown,
  Button,
  Popover,
  OverlayTrigger,
  Card,
  Container,
  Row,
  Col,
  Accordion,
  NavLink,
  Tabs,
  Tab,
  Badge,
} from "react-bootstrap";
import Chat from "./Chat";
import { toast } from "react-toastify";

export default function Orders() {
  const notify = () => toast("Wow so easy !", { autoClose: 60000 });

  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector.selectAll);

  const popover = (order) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">are you sure?</Popover.Title>
      <Popover.Content>
        <Button
          variant="outline-danger"
          onClick={() => {
            dispatch(canceledOrder(order._id));
          }}
        >
          YES
        </Button>
      </Popover.Content>
    </Popover>
  );

  const mapOrders = (orders = []) => {
    if (orders.length) return mapping(orders);
    else return <p>no orders</p>;
  };

  const mapLocation = (long = 0, lat = 0) => {
    return `https://www.google.com/maps/dir//${lat},${long}/@${lat},${long},17z`;
  };

  const mapping = (orders = []) =>
    orders.map((order, index) => {
      return (
        <div className="order " key={index.toString()}>
          <Card.Title>name : {order.customer.username}</Card.Title>
          <Card.Body>
            <h5>status : {order.status}</h5>

            <p>timePlaced : {order.timePlaced}</p>
            {order.timeScheduled && (
              <p>timeScheduled : {order.timeScheduled}</p>
            )}
            {order.address?.address && (
              <p>address : {order.address?.address}</p>
            )}
            {order.address?.longitude && (
              <p>
                location : (
                <a
                  href={mapLocation(
                    order.address?.longitude,
                    order.address?.latitude
                  )}
                >
                  click here
                </a>
                )
              </p>
            )}
            {order.timeDelivered && (
              <p>timeDelivered : {order.timeDelivered}</p>
            )}
            {order.instruction && <p>instruction : {order.instruction}</p>}
            {order.isPaid ? <p>is paid</p> : <p> is not paid</p>}
          </Card.Body>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              order status
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => dispatch(orderInProgress(order._id))}
              >
                in progress
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => dispatch(deliveredOrder(order._id))}
              >
                delivered
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={popover(order)}
          >
            <Button variant="outline-danger">Cancel order</Button>
          </OverlayTrigger>

          <Accordion defaultActiveKey="1">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  chat{" "}
                  <Badge variant="primary">
                    {order.unreadMessagesForAdmin}
                  </Badge>{" "}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <div style={{ height: "400px" }}>
                  <Chat id={order._id} />
                </div>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      );
    });

  return (
    <>
      <div className="headline">Orders</div>
      <Row className="orders">{mapOrders(orders)}</Row>
      <button className="button" onClick={() => dispatch(asyncOrders())}>
        refresh
      </button>
    </>
  );
}
