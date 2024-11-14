import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    }}>
      <div style={{
        position: 'relative',
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
      }}>
        <Image src="/nexus-logo.png" alt="Nexus Logo" width={200} height={200} />
        <h2 style={{ margin: '1rem 0', fontSize: '1.5rem', fontWeight: '600' }}>Login</h2>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-envelope"></i> {/* Email Icon */}
            <input type="email" required placeholder="Email" style={{
              flex: '1',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-user"></i> {/* User Icon */}
            <input type="text" required placeholder="Username" style={{
              flex: '1',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }} />
          </div>
          <button type="submit" style={{
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
          }}>Sign In</button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/forgot-password">
          
              Forgot Password?
          
          </Link>
          <span style={{ display: 'block', margin: '1rem 0' }}>OR</span>
          <button style={{
            padding: '0.75rem',
            backgroundColor: '#db4437',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <i className="fab fa-google"></i> Sign in with Google
          </button>
          <Link href="/CreateAccount">
          
              Create Account?
         
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
