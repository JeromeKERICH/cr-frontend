import { useEffect, useState } from "react";
import { createStaff, getAllUsers, updateUser, deleteUser } from "../../services/admin.service";
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Shield,
  UserCheck,
  UserX,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  Check,
  X
} from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "lawyer",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [actionMenu, setActionMenu] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Load users error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      
      if (editingUser) {
        // Update existing user
        await updateUser(editingUser._id, {
          fullName: form.fullName,
          email: form.email,
          role: form.role,
        });
        setSuccess("User updated successfully!");
      } else {
        // Create new user
        await createStaff(form);
        setSuccess("User created successfully!");
      }
      
      // Reset form and reload users
      setForm({ fullName: "", email: "", password: "", role: "lawyer" });
      setEditingUser(null);
      setShowCreateForm(false);
      loadUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      fullName: user.fullName,
      email: user.email,
      password: "", // Password not shown for security
      role: user.role,
    });
    setShowCreateForm(true);
    setActionMenu(null);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setSuccess("User deleted successfully!");
      setDeleteConfirm(null);
      loadUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await updateUser(user._id, { 
        isActive: !user.isActive 
      });
      setSuccess(`User ${!user.isActive ? 'activated' : 'deactivated'} successfully!`);
      loadUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update user status.");
    }
  };

  // Filter and search users
  useEffect(() => {
    let result = users;
    
    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredUsers(result);
  }, [searchTerm, roleFilter, users]);

  useEffect(() => {
    loadUsers();
  }, []);

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return { bg: '#FEF3C7', text: '#92400E', icon: <Shield size={14} /> };
      case 'lawyer': return { bg: '#DBEAFE', text: '#1E40AF', icon: <UserCheck size={14} /> };
      default: return { bg: '#F3F4F6', text: '#4B5563', icon: null };
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? 
      { bg: '#D1FAE5', text: '#065F46', label: 'Active' } : 
      { bg: '#FEE2E2', text: '#991B1B', label: 'Inactive' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#333' }}>User Management</h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setEditingUser(null);
            setForm({ fullName: "", email: "", password: "", role: "lawyer" });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: '#CC973C', color: '#171538' }}
        >
          <UserPlus size={18} />
          {editingUser ? 'Edit User' : 'Add New User'}
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
          <AlertCircle size={20} style={{ color: '#DC2626' }} />
          <span className="flex-1" style={{ color: '#DC2626' }}>{error}</span>
          <button onClick={() => setError("")}>
            <X size={20} style={{ color: '#DC2626' }} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: '#D1FAE5', border: '1px solid #A7F3D0' }}>
          <Check size={20} style={{ color: '#065F46' }} />
          <span className="flex-1" style={{ color: '#065F46' }}>{success}</span>
          <button onClick={() => setSuccess("")}>
            <X size={20} style={{ color: '#065F46' }} />
          </button>
        </div>
      )}

      {/* Create/Edit Form */}
      {(showCreateForm || editingUser) && (
        <div className="rounded-xl border p-6" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: '#333' }}>
              {editingUser ? 'Edit User' : 'Create New User'}
            </h2>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingUser(null);
                setForm({ fullName: "", email: "", password: "", role: "lawyer" });
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} style={{ color: '#666' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                    Temporary Password *
                  </label>
                  <input
                    type="password"
                    placeholder="Enter temporary password"
                    className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: '#E5E5E5',
                      backgroundColor: '#FCFCFB',
                      color: '#333'
                    }}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={8}
                  />
                  <p className="text-xs mt-1" style={{ color: '#666' }}>
                    Minimum 8 characters
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                  Role *
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FCFCFB',
                    color: '#333'
                  }}
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                >
                  <option value="lawyer">Lawyer</option>
                  <option value="admin">Administrator</option>
                  <option value="staff">Staff</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#1E1E59', color: '#FCFCFB' }}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingUser(null);
                  setForm({ fullName: "", email: "", password: "", role: "lawyer" });
                }}
                className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-gray-50"
                style={{ borderColor: '#E5E5E5', color: '#666' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: '#999' }} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 appearance-none"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FCFCFB',
              color: '#333'
            }}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="lawyer">Lawyer</option>
            <option value="staff">Staff</option>
            <option value="client">Client</option>
          </select>
          
          <button
            onClick={loadUsers}
            className="px-4 py-3 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E5E5E5', color: '#333' }}
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border overflow-hidden" style={{ 
        backgroundColor: '#FCFCFB',
        borderColor: '#E5E5E5'
      }}>
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#CC973C' }} />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center p-12">
            <UserX size={48} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: '#333' }}>No users found</h3>
            <p className="text-sm" style={{ color: '#666' }}>
              {searchTerm || roleFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'No users in the system yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  <th className="text-left p-4 font-medium" style={{ color: '#666' }}>User</th>
                  <th className="text-left p-4 font-medium" style={{ color: '#666' }}>Role</th>
                  <th className="text-left p-4 font-medium" style={{ color: '#666' }}>Status</th>
                  <th className="text-left p-4 font-medium" style={{ color: '#666' }}>Created</th>
                  <th className="text-left p-4 font-medium" style={{ color: '#666' }}>Last Active</th>
                  <th className="text-left p-4 font-medium" style={{ color: '#666' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const role = getRoleColor(user.role);
                  const status = getStatusColor(user.isActive !== false);
                  
                  return (
                    <tr 
                      key={user._id} 
                      className="border-t hover:bg-gray-50 transition-colors"
                      style={{ borderColor: '#E5E5E5' }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#CC973C' }}>
                            <UserCheck size={20} style={{ color: '#171538' }} />
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: '#333' }}>{user.fullName}</p>
                            <p className="text-sm" style={{ color: '#666' }}>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm w-fit" style={{ backgroundColor: role.bg, color: role.text }}>
                          {role.icon}
                          <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.isActive !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: status.bg, color: status.text }}>
                            {status.label}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#666' }}>
                        {formatDate(user.createdAt || new Date().toISOString())}
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#666' }}>
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <button
                            onClick={() => setActionMenu(actionMenu === user._id ? null : user._id)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical size={20} style={{ color: '#666' }} />
                          </button>
                          
                          {actionMenu === user._id && (
                            <div className="absolute right-0 top-10 z-10 w-48 rounded-lg shadow-lg border" style={{ 
                              backgroundColor: '#FCFCFB',
                              borderColor: '#E5E5E5'
                            }}>
                              <button
                                onClick={() => handleEdit(user)}
                                className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                                style={{ color: '#333' }}
                              >
                                <Edit2 size={16} />
                                Edit User
                              </button>
                              <button
                                onClick={() => handleToggleStatus(user)}
                                className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                                style={{ color: '#333' }}
                              >
                                {user.isActive !== false ? <UserX size={16} /> : <UserCheck size={16} />}
                                {user.isActive !== false ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(user._id)}
                                className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                                style={{ color: '#DC2626' }}
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full rounded-xl p-6" style={{ 
            backgroundColor: '#FCFCFB',
            border: '1px solid #E5E5E5'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <AlertCircle size={24} style={{ color: '#DC2626' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: '#333' }}>Confirm Deletion</h3>
            </div>
            
            <p className="mb-6" style={{ color: '#666' }}>
              Are you sure you want to delete this user? This action cannot be undone and will permanently remove all associated data.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-90 flex-1"
                style={{ backgroundColor: '#DC2626', color: '#FCFCFB' }}
              >
                Delete User
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-gray-50 flex-1"
                style={{ borderColor: '#E5E5E5', color: '#666' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Total Users</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#E8F4FD' }}>
              <UserCheck size={20} style={{ color: '#1E1E59' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>{users.length}</p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Active Users</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
              <UserCheck size={20} style={{ color: '#065F46' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {users.filter(u => u.isActive !== false).length}
          </p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Administrators</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
              <Shield size={20} style={{ color: '#92400E' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        
        <div className="rounded-xl border p-4" style={{ 
          backgroundColor: '#FCFCFB',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#666' }}>Lawyers</span>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#DBEAFE' }}>
              <UserCheck size={20} style={{ color: '#1E40AF' }} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-2" style={{ color: '#333' }}>
            {users.filter(u => u.role === 'lawyer').length}
          </p>
        </div>
      </div>
    </div>
  );
}