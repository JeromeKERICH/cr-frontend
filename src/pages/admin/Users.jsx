import { useState, useEffect } from "react";
import { createStaff, getAllUsers, updateUser, deleteUser } from "../../services/admin.service";
import {
  UserPlus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  RefreshCw,
  AlertCircle,
  Check,
  X,
  ChevronDown,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Clock,
  Award,
  Star,
  Briefcase,
  Users as UsersIcon,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [actionMenu, setActionMenu] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "lawyer",
    phone: "",
    specialization: "",
    status: "active"
  });

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

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let result = users;
    
    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(user => 
        statusFilter === "active" ? user.status !== "inactive" : user.status === "inactive"
      );
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.fullName?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term) ||
        user.specialization?.toLowerCase().includes(term)
      );
    }
    
    setFilteredUsers(result);
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      
      if (editingUser) {
        await updateUser(editingUser._id, form);
        setSuccess("User updated successfully!");
      } else {
        await createStaff(form);
        setSuccess("User created successfully!");
      }
      
      setForm({
        fullName: "",
        email: "",
        password: "",
        role: "lawyer",
        phone: "",
        specialization: "",
        status: "active"
      });
      setEditingUser(null);
      setShowCreateForm(false);
      loadUsers();
      
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
      password: "",
      role: user.role,
      phone: user.phone || "",
      specialization: user.specialization || "",
      status: user.status || "active"
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
        status: user.status === "active" ? "inactive" : "active" 
      });
      setSuccess(`User ${user.status === "active" ? "deactivated" : "activated"} successfully!`);
      loadUsers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update user status.");
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin':
        return { bg: '#00124E', text: '#FAFAF8', icon: <Shield size={14} /> };
      case 'lawyer':
        return { bg: '#CA9D52', text: '#00124E', icon: <Award size={14} /> };
      case 'staff':
        return { bg: '#10B981', text: '#FAFAF8', icon: <Briefcase size={14} /> };
      case 'client':
        return { bg: '#6B7280', text: '#FAFAF8', icon: <UsersIcon size={14} /> };
      default:
        return { bg: '#F3F4F6', text: '#111', icon: null };
    }
  };

  const getStatusColor = (status) => {
    return status === "active" ? 
      { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', label: 'Active' } : 
      { bg: 'rgba(220, 38, 38, 0.1)', text: '#DC2626', label: 'Inactive' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#00124E' }}>
            User Management
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setEditingUser(null);
            setForm({
              fullName: "",
              email: "",
              password: "",
              role: "lawyer",
              phone: "",
              specialization: "",
              status: "active"
            });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: '#CA9D52', color: '#00124E' }}
        >
          <UserPlus size={18} />
          {showCreateForm ? 'Close Form' : 'Add New User'}
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
        <div className="flex items-center gap-3 p-4 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981' }}>
          <Check size={20} style={{ color: '#10B981' }} />
          <span className="flex-1" style={{ color: '#10B981' }}>{success}</span>
          <button onClick={() => setSuccess("")}>
            <X size={20} style={{ color: '#10B981' }} />
          </button>
        </div>
      )}

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="rounded-xl border p-6" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: '#00124E' }}>
              {editingUser ? 'Edit User' : 'Create New User'}
            </h2>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingUser(null);
                setForm({
                  fullName: "",
                  email: "",
                  password: "",
                  role: "lawyer",
                  phone: "",
                  specialization: "",
                  status: "active"
                });
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} style={{ color: '#666' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#111'
                  }}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#111'
                  }}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                    Temporary Password *
                  </label>
                  <input
                    type="password"
                    placeholder="Enter temporary password"
                    className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: '#E5E5E5',
                      backgroundColor: '#FAFAF8',
                      color: '#111'
                    }}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required={!editingUser}
                    minLength={8}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#111'
                  }}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Role *
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#111'
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

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="e.g., Corporate Law, Family Law"
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#111'
                  }}
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#111'
                  }}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingUser(null);
                  setForm({
                    fullName: "",
                    email: "",
                    password: "",
                    role: "lawyer",
                    phone: "",
                    specialization: "",
                    status: "active"
                  });
                }}
                className="px-6 py-3 rounded-lg font-medium border transition-all hover:bg-gray-50"
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
            placeholder="Search users by name, email, or specialization..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#111'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#111'
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
          
          <select
            className="px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E5E5',
              backgroundColor: '#FAFAF8',
              color: '#111'
            }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            onClick={loadUsers}
            className="px-4 py-3 rounded-lg border flex items-center gap-2 transition-colors hover:bg-gray-50"
            style={{ borderColor: '#E5E5E5', color: '#00124E' }}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Users Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#CA9D52' }} />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center p-12 rounded-xl border" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <UsersIcon size={48} className="mx-auto mb-4" style={{ color: '#999' }} />
          <h3 className="text-lg font-medium mb-2" style={{ color: '#00124E' }}>No users found</h3>
          <p className="text-sm" style={{ color: '#666' }}>
            {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'No users in the system yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => {
            const role = getRoleColor(user.role);
            const status = getStatusColor(user.status);
            
            return (
              <div
                key={user._id}
                className="rounded-xl border transition-all hover:shadow-lg"
                style={{ 
                  backgroundColor: '#FAFAF8',
                  borderColor: '#E5E5E5'
                }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 157, 82, 0.1)' }}>
                        <UserCheck size={24} style={{ color: '#CA9D52' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: '#111' }}>{user.fullName}</h3>
                        <p className="text-xs" style={{ color: '#666' }}>{user.email}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setActionMenu(actionMenu === user._id ? null : user._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical size={18} style={{ color: '#666' }} />
                      </button>
                      
                      {actionMenu === user._id && (
                        <div className="absolute right-0 top-10 z-10 w-48 rounded-lg shadow-lg border" style={{ 
                          backgroundColor: '#FAFAF8',
                          borderColor: '#E5E5E5'
                        }}>
                          <button
                            onClick={() => handleEdit(user)}
                            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                            style={{ color: '#00124E' }}
                          >
                            <Edit2 size={16} />
                            Edit User
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                            style={{ color: '#00124E' }}
                          >
                            {user.status === "active" ? (
                              <>
                                <Lock size={16} />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Unlock size={16} />
                                Activate
                              </>
                            )}
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
                  </div>

                  {/* Role & Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: role.bg, color: role.text }}>
                      {role.icon}
                      <span className="capitalize">{user.role}</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: status.bg, color: status.text }}>
                      {user.status === "active" ? <Check size={14} /> : <X size={14} />}
                      <span>{status.label}</span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 text-sm">
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} style={{ color: '#CA9D52' }} />
                        <span style={{ color: '#666' }}>{user.phone}</span>
                      </div>
                    )}
                    {user.specialization && (
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} style={{ color: '#CA9D52' }} />
                        <span style={{ color: '#666' }}>{user.specialization}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={14} style={{ color: '#CA9D52' }} />
                      <span style={{ color: '#666' }}>Joined {formatDate(user.createdAt || new Date())}</span>
                    </div>
                  </div>

                  {/* Last Active */}
                  {user.lastLogin && (
                    <div className="mt-4 pt-4 border-t flex items-center gap-2" style={{ borderColor: '#E5E5E5' }}>
                      <Clock size={14} style={{ color: '#999' }} />
                      <span className="text-xs" style={{ color: '#999' }}>
                        Last active: {formatDate(user.lastLogin)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full rounded-xl p-6" style={{ 
            backgroundColor: '#FAFAF8',
            border: '1px solid #E5E5E5'
          }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <AlertCircle size={24} style={{ color: '#DC2626' }} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: '#00124E' }}>Confirm Deletion</h3>
            </div>
            
            <p className="mb-6" style={{ color: '#666' }}>
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 flex-1"
                style={{ backgroundColor: '#DC2626', color: '#FAFAF8' }}
              >
                Delete User
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-3 rounded-lg font-medium border transition-all hover:bg-gray-50 flex-1"
                style={{ borderColor: '#E5E5E5', color: '#666' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}