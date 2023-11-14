import PageHeading from '@/components/PageHeading/PageHeading';
import ActivityManager from './_components/ActivityManager';

async function fetchActivity(id) {
    return await prisma.workoutLog.findUnique({
        where: {
            id: id,
        },
        select: {
			id: true,
			name: true,
			duration: true,
			date: true,
			exercises: {
				select: {
					id: true,
					exerciseId: true,
					Exercise: {
						select: {
							name: true
						}
					},
					sets: {
						select: {
							weight: true,
							reps: true
							
						}
					}
				}
			}
		}
    });
}

export default async function EditActivity({ params }) {
    const activity = await fetchActivity(params.id);
    
    return (
        <>
            <PageHeading title={`Edit Activity: ${activity.name}`} />
            <ActivityManager activity={activity} />
            <pre>{JSON.stringify(activity, null, 2)}</pre>
        </>
    )
}