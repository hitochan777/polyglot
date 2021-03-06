import React from "react";
import { NextPage, NextPageContext } from "next";

interface Props {
  statusCode: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = async ({
  res,
  err,
}: NextPageContext): Promise<Props> => {
  const statusCode = (res && res.statusCode) || (err && err.statusCode) || 404;
  return { statusCode };
};

export default Error;
