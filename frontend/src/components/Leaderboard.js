import React from "react";
import Table from "react-bootstrap/Table";

const FooskillLeaderboard = ({ players }) => (
  <div>
    <h4>Top 10</h4>

    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {players
          .sort((p1, p2) => p1.rating < p2.rating)
          .slice(0, 10)
          .map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{Math.round(player.rating)}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  </div>
);

export default FooskillLeaderboard;