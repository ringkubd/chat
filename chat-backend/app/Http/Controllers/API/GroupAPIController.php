<?php

namespace App\Http\Controllers\API;

use App\Events\GroupCreated;
use App\Http\Requests\API\CreateGroupAPIRequest;
use App\Http\Requests\API\UpdateGroupAPIRequest;
use App\Models\Group;
use App\Repositories\GroupRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;

/**
 * Class GroupAPIController
 */
class GroupAPIController extends AppBaseController
{
    private GroupRepository $groupRepository;

    public function __construct(GroupRepository $groupRepo)
    {
        $this->groupRepository = $groupRepo;
    }

    /**
     * Display a listing of the Groups.
     * GET|HEAD /groups
     */
    public function index(Request $request): JsonResponse
    {
        $groups = $this->groupRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($groups->toArray(), 'Groups retrieved successfully');
    }

    /**
     * Store a newly created Group in storage.
     * POST /groups
     */
    public function store(CreateGroupAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        $group = $this->groupRepository->create($input);

        $users = collect(request('users'));
        $users->push($request->user()->id);

        $group->users()->attach($users);

        broadcast(new GroupCreated($group))->toOthers();

        return $this->sendResponse($group->toArray(), 'Group saved successfully');
    }

    /**
     * Display the specified Group.
     * GET|HEAD /groups/{id}
     */
    public function show($id): JsonResponse
    {
        /** @var Group $group */
        $group = $this->groupRepository->find($id);

        if (empty($group)) {
            return $this->sendError('Group not found');
        }

        return $this->sendResponse($group->toArray(), 'Group retrieved successfully');
    }

    /**
     * Update the specified Group in storage.
     * PUT/PATCH /groups/{id}
     */
    public function update($id, UpdateGroupAPIRequest $request): JsonResponse
    {
        $input = $request->all();

        /** @var Group $group */
        $group = $this->groupRepository->find($id);

        if (empty($group)) {
            return $this->sendError('Group not found');
        }

        $group = $this->groupRepository->update($input, $id);

        return $this->sendResponse($group->toArray(), 'Group updated successfully');
    }

    /**
     * Remove the specified Group from storage.
     * DELETE /groups/{id}
     *
     * @throws \Exception
     */
    public function destroy($id): JsonResponse
    {
        /** @var Group $group */
        $group = $this->groupRepository->find($id);

        if (empty($group)) {
            return $this->sendError('Group not found');
        }

        $group->delete();

        return $this->sendSuccess('Group deleted successfully');
    }
}
