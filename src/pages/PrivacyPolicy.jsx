import { useTheme } from '@mui/material/styles';
import { Container, Typography, Paper, Box, useMediaQuery, Grid, Divider } from '@mui/material';

const PrivacyPolicy = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ background: theme.palette.secondary.main, padding: isMobile ? '100px 10px' : '120px 20px' }}>
      <Grid container sx={{padding: isMobile ? '20px' : '40px', borderRadius:'5px', backgroundColor:'#fff!important'}}>
      <Grid item>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 500, marginBottom: 2 }}>
          Privacy Policy
        </Typography>
<Divider />
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Last Updated: 24/08/2024
        </Typography>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 500, marginBottom: 1 }}>
          Introduction
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Welcome to Future Gen Stats. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 500, marginBottom: 1 }}>
          Information We Collect
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          We do not collect personal information from users of our website. We do not track, store, or have access to any personal data.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 500, marginBottom: 1 }}>
          Cookies and Tracking Technologies
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Our website does not use cookies or other tracking technologies. We do not monitor your browsing activities nor collect data on your visits.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 500, marginBottom: 1 }}>
          Third-Party Services
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Our website may contain links to third-party sites. We are not responsible for the privacy practices of those third-party sites. We encourage you to review their privacy policies before providing any personal information.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 500, marginBottom: 1 }}>
          Changes to This Privacy Policy
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically for any updates.
        </Typography>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 500, marginBottom: 1 }}>
          Contact Us
        </Typography>

        <Typography variant="body1">
          If you have any questions about this Privacy Policy, please contact us at michelesifanno.ms@gmail.com.
        </Typography>

      </Grid>
    </Grid>
      </Box >
  );
};

export default PrivacyPolicy;
