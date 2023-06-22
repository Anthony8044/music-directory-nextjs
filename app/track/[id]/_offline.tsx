import Head from "next/head";

const Fallback = () => (
  <>
    <Head>
      <title>Cantonese Pop Tracks</title>
    </Head>
    <h1>This is offline fallback page</h1>
    <h2>You need to be online to view this page.</h2>
  </>
);

export default Fallback;
