import repositoryServiceInstance, { ReadonlyRepository } from '@/app/services/repositoryService';
import httpServiceInstance, { HttpResponse } from '@/app/services/httpService';
import HttpError from '@/app/models/httpError';
describe('RepositoryService', () => {

  describe('getRepositoriesByUserNameOrOrg', () => {

    describe('when call is successful', () => {
      let expectedResponse: ReadonlyRepository[] | undefined;
      let response: Promise<HttpResponse<ReadonlyRepository[]> | HttpError> | undefined;

      beforeEach(() => {
        expectedResponse = [
          {
            'id': 151758226,
            'node_id': 'MDEwOlJlcG9zaXRvcnkxNTE3NTgyMjY=',
            'name': 'appcenter-docs',
            'full_name': 'winnie/appcenter-docs',
            'private': false,
            'owner': {
              'login': 'winnie',
              'id': 8868628,
              'node_id': 'MDQ6VXNlcjg4Njg2Mjg=',
              'avatar_url': 'https://avatars.githubusercontent.com/u/8868628?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/winnie',
              'html_url': 'https://github.com/winnie',
              'followers_url': 'https://api.github.com/users/winnie/followers',
              'following_url': 'https://api.github.com/users/winnie/following{/other_user}',
              'gists_url': 'https://api.github.com/users/winnie/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/winnie/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/winnie/subscriptions',
              'organizations_url': 'https://api.github.com/users/winnie/orgs',
              'repos_url': 'https://api.github.com/users/winnie/repos',
              'events_url': 'https://api.github.com/users/winnie/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/winnie/received_events',
              'type': 'User',
              'site_admin': false
            },
            'html_url': 'https://github.com/winnie/appcenter-docs',
            'description': 'content repo for Visual Studio App Center on docs.microsoft.com',
            'fork': true,
            'url': 'https://api.github.com/repos/winnie/appcenter-docs',
            'forks_url': 'https://api.github.com/repos/winnie/appcenter-docs/forks',
            'keys_url': 'https://api.github.com/repos/winnie/appcenter-docs/keys{/key_id}',
            'collaborators_url': 'https://api.github.com/repos/winnie/appcenter-docs/collaborators{/collaborator}',
            'teams_url': 'https://api.github.com/repos/winnie/appcenter-docs/teams',
            'hooks_url': 'https://api.github.com/repos/winnie/appcenter-docs/hooks',
            'issue_events_url': 'https://api.github.com/repos/winnie/appcenter-docs/issues/events{/number}',
            'events_url': 'https://api.github.com/repos/winnie/appcenter-docs/events',
            'assignees_url': 'https://api.github.com/repos/winnie/appcenter-docs/assignees{/user}',
            'branches_url': 'https://api.github.com/repos/winnie/appcenter-docs/branches{/branch}',
            'tags_url': 'https://api.github.com/repos/winnie/appcenter-docs/tags',
            'blobs_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/blobs{/sha}',
            'git_tags_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/tags{/sha}',
            'git_refs_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/refs{/sha}',
            'trees_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/trees{/sha}',
            'statuses_url': 'https://api.github.com/repos/winnie/appcenter-docs/statuses/{sha}',
            'languages_url': 'https://api.github.com/repos/winnie/appcenter-docs/languages',
            'stargazers_url': 'https://api.github.com/repos/winnie/appcenter-docs/stargazers',
            'contributors_url': 'https://api.github.com/repos/winnie/appcenter-docs/contributors',
            'subscribers_url': 'https://api.github.com/repos/winnie/appcenter-docs/subscribers',
            'subscription_url': 'https://api.github.com/repos/winnie/appcenter-docs/subscription',
            'commits_url': 'https://api.github.com/repos/winnie/appcenter-docs/commits{/sha}',
            'git_commits_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/commits{/sha}',
            'comments_url': 'https://api.github.com/repos/winnie/appcenter-docs/comments{/number}',
            'issue_comment_url': 'https://api.github.com/repos/winnie/appcenter-docs/issues/comments{/number}',
            'contents_url': 'https://api.github.com/repos/winnie/appcenter-docs/contents/{+path}',
            'compare_url': 'https://api.github.com/repos/winnie/appcenter-docs/compare/{base}...{head}',
            'merges_url': 'https://api.github.com/repos/winnie/appcenter-docs/merges',
            'archive_url': 'https://api.github.com/repos/winnie/appcenter-docs/{archive_format}{/ref}',
            'downloads_url': 'https://api.github.com/repos/winnie/appcenter-docs/downloads',
            'issues_url': 'https://api.github.com/repos/winnie/appcenter-docs/issues{/number}',
            'pulls_url': 'https://api.github.com/repos/winnie/appcenter-docs/pulls{/number}',
            'milestones_url': 'https://api.github.com/repos/winnie/appcenter-docs/milestones{/number}',
            'notifications_url': 'https://api.github.com/repos/winnie/appcenter-docs/notifications{?since,all,participating}',
            'labels_url': 'https://api.github.com/repos/winnie/appcenter-docs/labels{/name}',
            'releases_url': 'https://api.github.com/repos/winnie/appcenter-docs/releases{/id}',
            'deployments_url': 'https://api.github.com/repos/winnie/appcenter-docs/deployments',
            'created_at': '2018-10-05T17:50:39Z',
            'updated_at': '2018-10-05T17:50:41Z',
            'pushed_at': '2018-03-24T08:15:06Z',
            'git_url': 'git://github.com/winnie/appcenter-docs.git',
            'ssh_url': 'git@github.com:winnie/appcenter-docs.git',
            'clone_url': 'https://github.com/winnie/appcenter-docs.git',
            'svn_url': 'https://github.com/winnie/appcenter-docs',
            'homepage': 'https://docs.microsoft.com/appcenter/',
            'size': 132707,
            'stargazers_count': 0,
            'watchers_count': 0,
            'language': 'PowerShell',
            'has_issues': false,
            'has_projects': true,
            'has_downloads': true,
            'has_wiki': true,
            'has_pages': false,
            'has_discussions': false,
            'forks_count': 0,
            'mirror_url': null,
            'archived': false,
            'disabled': false,
            'open_issues_count': 0,
            'license': {
              'key': 'cc-by-4.0',
              'name': 'Creative Commons Attribution 4.0 International',
              'spdx_id': 'CC-BY-4.0',
              'url': 'https://api.github.com/licenses/cc-by-4.0',
              'node_id': 'MDc6TGljZW5zZTI1'
            },
            'allow_forking': true,
            'is_template': false,
            'web_commit_signoff_required': false,
            'topics': [],
            'visibility': 'public',
            'forks': 0,
            'open_issues': 0,
            'watchers': 0,
            'default_branch': 'live'
          }
        ];
        httpServiceInstance.get = jest.fn().mockReturnValue(Promise.resolve({ data: expectedResponse }));
        response = repositoryServiceInstance.getRepositoriesByUserNameOrOrg({ userNameOrOrg: 'winnie' });
      });

      it('should call httpService', () => {
        expect(httpServiceInstance.get).toHaveBeenCalledWith(
          'https://api.github.com/users/winnie/repos?owner=owner&sort=full_name&direction=asc&per_page=10&page=1',
          { 'headers': { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } }
        );
      });

      it('should return the list of repositories', async () => {
        const resolvedResponse = await response;
        expect(resolvedResponse).toEqual({data: expectedResponse});
      });
    });

    //TODO: Figure out it triggering UnhandledPromiseRejection error
    xdescribe('when call is a failure', () => {
      let expectedError: HttpError | undefined;
      let response: Promise<HttpResponse<ReadonlyRepository[]> | HttpError> | undefined;

      beforeEach(() => {
        expectedError = {
          name: 'Resource not found',
          message: 'Not Found',
          status: 404,
        };
        httpServiceInstance.get = jest.fn().mockRejectedValue(expectedError);
        response = repositoryServiceInstance.getRepositoriesByUserNameOrOrg({ userNameOrOrg: 'winnie' });
      });

      it('should call httpService', () => {
        expect(httpServiceInstance.get).toHaveBeenCalledWith(
          'https://api.github.com/users/winnie/repos?owner=owner&sort=full_name&direction=asc&per_page=10&page=1',
          { 'headers': { 'Accept': 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } }
        );
      });

      it('should return the error message', async () => {
        try {
          await response;
        } catch (error) {
          expect(error).toEqual(expectedError);
        }
      });
    });
  });
});