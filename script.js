// Initialize Supabase (Get these from your Supabase Dashboard)
const supabase = supabase.createClient('sb_publishable_yKuVkygzLvjP7eSzZBCGFA__5Wsgf6A', 'sb_secret__pRGw··························');

// Toggle Modal
function toggleModal(show) { document.getElementById('authModal').style.display = show ? 'flex' : 'none'; }

// Switch Login/Signup
function switchMode() {
    const title = document.getElementById('modalTitle');
    const isSignup = title.innerText === 'Sign In';
    title.innerText = isSignup ? 'Sign Up' : 'Sign In';
}

// Authentication Logic
document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const isSignup = document.getElementById('modalTitle').innerText === 'Sign Up';

    if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        alert(error ? error.message : "Success! Check your email.");
    } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.message);
        } else {
            // Check Role & Redirect
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
            window.location.href = profile?.role === 'admin' ? '/admin.html' : '/index.html';
        }
    }
});