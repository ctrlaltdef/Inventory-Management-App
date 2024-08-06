import Head from 'next/head';
import Spline from '@splinetool/react-spline/next';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <main>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black', // Assuming the Spline background is black
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              '@media (max-width: 478px)': { // Adjust this breakpoint as needed
                width: '100%',
                transform: 'scaleX(calc(1.5 + 0.5 * (100vw / 400)))' // Further reduce width for very small devices
              },
            }}
          >
            <Spline
            scene="https://prod.spline.design/Y9QTlx4vutlikNuV/scene.splinecode"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        </Box>
      </main>
    </>
  );
}
