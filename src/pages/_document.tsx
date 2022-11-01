import { Children } from "react";
import { CssBaseline } from "@nextui-org/react";
import Document, {
  Html,
  Main,
  Head,
  NextScript,
  type DocumentContext,
} from "next/document";
// import { resetServerContext } from 'react-beautiful-dnd';

const MyDocument = () => {
  return (
    <Html>
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (context: DocumentContext) => {
  const initialProps = await Document.getInitialProps(context);
  // resetServerContext();
  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles)],
  };
};

export default MyDocument;
