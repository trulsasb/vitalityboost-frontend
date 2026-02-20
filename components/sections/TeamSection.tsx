interface TeamMember {
  name: string;
  role: string;
  image?: React.ReactNode;
  bio?: string;
}

interface TeamSectionProps {
  heading?: string;
  subheading?: string;
  members: TeamMember[];
  className?: string;
}

export function TeamSection({
  heading,
  subheading,
  members,
  className = "",
}: TeamSectionProps) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4">

        {heading && (
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            {subheading}
          </p>
        )}

        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {members.map((member, i) => (
            <div key={i} className="text-center">
              {member.image && (
                <div className="mb-4 flex justify-center">
                  {member.image}
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h3>

              <p className="text-gray-600 text-sm">{member.role}</p>

              {member.bio && (
                <p className="mt-3 text-gray-600 text-sm">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
