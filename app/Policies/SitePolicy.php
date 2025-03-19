<?php

namespace App\Policies;

use App\Models\Site;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SitePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can preform a software activation on the site.
     */
    public function activateSoftware(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can preform a software deactivation on the site.
     */
    public function deactivateSoftware(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can preform an software software uninstall on the site.
     */
    public function uninstallSoftware(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can preform a software update on the site.
     */
    public function updateSoftware(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function updateVulnerability(User $user, Site $site): Response
    {
        return $user->id === $site->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
