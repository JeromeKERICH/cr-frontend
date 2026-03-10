import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Linkedin,
  Briefcase,
  FileText,
  X,
  Check,
  AlertCircle,
  RefreshCw,
  User,
  Upload,
  Camera,
  Eye
} from "lucide-react";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/team/admin");
      setMembers(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load team members. Please try again.");
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setSuccess("");
      
      const form = new FormData(e.target);
      
      if (editingMember) {
        await api.put(`/team/${editingMember._id}`, form);
        setSuccess("Team member updated successfully!");
      } else {
        await api.post("/team", form);
        setSuccess("Team member added successfully!");
      }
      
      e.target.reset();
      setPreviewImage(null);
      setEditingMember(null);
      setShowForm(false);
      load();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/team/${id}`);
      setSuccess("Team member deleted successfully!");
      setDeleteConfirm(null);
      load();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete team member. Please try again.");
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowForm(true);
    setPreviewImage(member.photo);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEditingMember(null);
    setShowForm(false);
    setPreviewImage(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#00124E' }}>
            Team Management
          </h1>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            Manage your legal team members and their profiles
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="p-2.5 rounded-lg border flex items-center gap-2 transition-all hover:opacity-90"
            style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAF8', color: '#00124E' }}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
          >
            <Plus size={18} />
            {showForm ? 'Close Form' : 'Add Member'}
          </button>
        </div>
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
      {showForm && (
        <div className="rounded-xl border p-6" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: '#00124E' }}>
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h2>
            <button
              onClick={resetForm}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} style={{ color: '#666' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Photo Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Profile Photo
                </label>
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div 
                      className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2"
                      style={{ 
                        borderColor: '#CA9D52',
                        backgroundColor: 'rgba(202, 157, 82, 0.1)'
                      }}
                    >
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera size={32} style={{ color: '#CA9D52' }} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      id="photo-upload"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="photo-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all hover:bg-gray-50"
                      style={{ borderColor: '#E5E5E5', color: '#00124E' }}
                    >
                      <Upload size={16} />
                      Choose Image
                    </label>
                    <p className="text-xs mt-2" style={{ color: '#666' }}>
                      Recommended: Square image, at least 300x300px
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Full Name *
                </label>
                <input
                  name="name"
                  defaultValue={editingMember?.name}
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#00124E'
                  }}
                  required
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Position *
                </label>
                <input
                  name="position"
                  defaultValue={editingMember?.position}
                  placeholder="e.g., Senior Partner"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#00124E'
                  }}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={editingMember?.email}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#00124E'
                  }}
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  LinkedIn Profile
                </label>
                <input
                  name="linkedin"
                  defaultValue={editingMember?.linkedin}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#00124E'
                  }}
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#00124E' }}>
                  Biography
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  defaultValue={editingMember?.bio}
                  placeholder="Professional background, expertise, and achievements..."
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#E5E5E5',
                    backgroundColor: '#FAFAF8',
                    color: '#00124E'
                  }}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
              >
                {editingMember ? 'Update Member' : 'Add Member'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-lg font-medium border transition-all hover:bg-gray-50"
                style={{ borderColor: '#E5E5E5', color: '#666' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#CA9D52' }} />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-16 rounded-xl border" style={{ 
          backgroundColor: '#FAFAF8',
          borderColor: '#E5E5E5'
        }}>
          <Users size={64} className="mx-auto mb-4" style={{ color: '#9CA3AF' }} />
          <h3 className="text-lg font-medium mb-2" style={{ color: '#00124E' }}>No team members yet</h3>
          <p className="text-sm" style={{ color: '#666' }}>
            Add your first team member to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90 inline-flex items-center gap-2"
            style={{ backgroundColor: '#00124E', color: '#FAFAF8' }}
          >
            <Plus size={16} />
            Add Team Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div
              key={member._id}
              className="rounded-xl border overflow-hidden transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: '#FAFAF8',
                borderColor: '#E5E5E5'
              }}
            >
              {/* Member Card */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div 
                    className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: 'rgba(202, 157, 82, 0.1)',
                      border: '2px solid #CA9D52'
                    }}
                  >
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={24} style={{ color: '#CA9D52' }} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg" style={{ color: '#00124E' }}>
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Briefcase size={12} style={{ color: '#CA9D52' }} />
                      <p className="text-xs" style={{ color: '#666' }}>{member.position}</p>
                    </div>
                    
                    {/* Contact Icons */}
                    <div className="flex items-center gap-2 mt-3">
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="p-1.5 rounded-full transition-colors hover:bg-gray-100"
                          title="Email"
                        >
                          <Mail size={14} style={{ color: '#666' }} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full transition-colors hover:bg-gray-100"
                          title="LinkedIn"
                        >
                          <Linkedin size={14} style={{ color: '#666' }} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio Preview */}
                {member.bio && (
                  <p className="text-sm mt-4 line-clamp-2" style={{ color: '#666' }}>
                    {member.bio}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} style={{ color: '#00124E' }} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(member._id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} style={{ color: '#DC2626' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
              Are you sure you want to remove this team member? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 flex-1"
                style={{ backgroundColor: '#DC2626', color: '#FAFAF8' }}
              >
                Delete
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