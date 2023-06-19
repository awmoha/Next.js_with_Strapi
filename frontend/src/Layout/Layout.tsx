import React, { ReactNode } from 'react';
import SidebarWithHeader from 'components/NavBar';
import { Box } from '@chakra-ui/react';
import Home from 'pages/Login';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <SidebarWithHeader />
      <Box>{children}</Box>
      {/* Här kan du lägga till andra komponenter som alltid ska vara synliga */}
    </Box>
  );
};

export default Layout;
