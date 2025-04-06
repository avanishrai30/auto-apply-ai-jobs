
import React from 'react';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ProfileSetup from '@/components/profile-setup/ProfileSetup';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProfileSetup />
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
