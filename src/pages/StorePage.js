import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { StoreForm } from '../sections/auth/login';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Storepage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      <Helmet>
        <title> Store | Create </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            right: { xs: 16, sm: 24, md: 40 },
            cursor: 'pointer',
          }}
        >
          <LogoutIcon onClick={handleLogout} />
        </Typography>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Store Details
            </Typography>

            <StoreForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
